"use client";

import "./content.css";
import "remixicon/fonts/remixicon.css";

import { BubbleMenu, EditorContent, FloatingMenu, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import Placeholder from "@tiptap/extension-placeholder";
import { useCallback, useRef, useState } from "react";
import { Button } from "../button";
import { baseURL, updateContent } from "@/app/lib/web/data";
import { showNotification } from "@/app/lib/utils";

const CustomDocument = Document.extend({
  content: "heading block+",
});

export default function Content({ content, id }: any) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        document: false,
        heading: false,
      }),
      Heading.configure({
        levels: [1, 2],
      }),
      CustomDocument, 
      Image.configure({
        inline: false
      }),
      TaskItem.configure({
        nested: true,
      }),
      TaskList,
      Highlight,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
        validate: href => /^https?:\/\//.test(href),
      }),
      Youtube.configure({
        controls: false,
        progressBarColor: 'white',
        modestBranding: false,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading' && node.attrs?.level === 1) {
            return "What’s the title?";
          }
          return "Start typing here...";
        },
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        spellcheck: "false",
        class: `focus:outline outline-blue-300 focus:outline-dashed focus:rounded-lg focus:outline-2`
      },
    },
  });

  const imageRef: any = useRef(null);
  const fileRef: any = useRef(null);
  const fileRefBubble: any = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  const addImage = useCallback(async function(e: any) {
    if (editor) {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("caption", "Image upload using TipTap");
      formData.append("category", "ImageTipTap");
      
      const res = await fetch(`${baseURL}/files`, { 
        method: "POST", 
        body: formData,
      });

      let data = await res.json();

      if (data.url) {
        editor
          .chain()
          .focus()
          .setImage({ src: `${baseURL}/${data.url}` })
          .run();
      }
    }
  }, [editor]);

  const addYoutubeVideo = () => {
    if (editor) {
      const url = prompt("Enter YouTube URL");

      if (url) {
        editor.commands.setYoutubeVideo({src: url});
      }
    }
  }

  const setLink = useCallback(() => {
    if (editor) {
      const previousUrl = editor.getAttributes('link').href;
      const url = window.prompt('URL', previousUrl);
  
      // cancelled
      if (url === null) {
        return;
      }
  
      // empty
      if (url === "") {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();
        return;
      }
  
      // update link
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  }, [editor]);

  const setFile = useCallback(async (e: any) => {
    if (editor) {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("caption", "File upload using TipTap");
      formData.append("category", "FileTipTap");
      
      const res = await fetch(`${baseURL}/files`, { 
        method: "POST", 
        body: formData,
      });

      let data = await res.json();

      const url = data?.url;

      // cancelled
      if (url === null) {
        return;
      }

      // empty
      if (url === "") {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();
        return;
      }

      // update link
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: `${baseURL}/${url}` })
        .run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  async function handleUpdateContent() {
    setIsLoading(true);
    try {
      await updateContent(id, editor?.getHTML());
      showNotification("Salvo com sucesso!");
    } catch (error) {
      showNotification("Ocorreu um erro. Tente novamente!", "error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div 
      style={{ paddingRight: 180 }} 
      className="prose prose-green prose-zinc marker:text-[#178415] max-w-none relative"
    >
      <div className="bg-gray-50">
        <FloatingMenu className="floating-menu" tippyOptions={{ duration: 100, placement: "top-start" }} editor={editor}>
          <div className="editor__header">
            <button
              className={`menu-item ${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}`}
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              title="Heading 1"
            >
              <i className={`ri-h-1`} />
            </button>

            <button
              className={`menu-item ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              title="Heading 2"
            >
              <i className={`ri-h-2`} />
            </button>

            <button
              className={`menu-item ${editor.isActive('paragraph') ? 'is-active' : ''}`}
              onClick={() => editor.chain().focus().setParagraph().run()}
              title="Paragraph"
            >
              <i className={`ri-paragraph`} />
            </button>

            <button
              className={`menu-item ${editor.isActive('bulletList') ? 'is-active' : ''}`}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              title="Bullet List"
            >
              <i className={`ri-list-unordered`} />
            </button>

            <button
              className={`menu-item ${editor.isActive('orderedList') ? 'is-active' : ''}`}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              title="Ordered List"
            >
              <i className={`ri-list-ordered`} />
            </button>

            <button
              className={`menu-item ${editor.isActive('taskList') ? 'is-active' : ''}`}
              onClick={() => editor.chain().focus().toggleTaskList().run()}
              title="Task List"
            >
              <i className={`ri-list-check-2`} />
            </button>
            
            <div className="divider" />

            <button
              className={`menu-item ${editor.isActive('bold') ? 'is-active' : ''}`}
              onClick={() => editor.chain().focus().toggleBold().run()}
              title="Bold"
            >
              <i className={`ri-bold`} />
            </button>

            <button
              className={`menu-item ${editor.isActive('italic') ? 'is-active' : ''}`}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              title="Italic"
            >
              <i className={`ri-italic`} />
            </button>

            <button
              className={`menu-item ${editor.isActive('strike') ? 'is-active' : ''}`}
              onClick={() => editor.chain().focus().toggleStrike().run()}
              title="Strike"
            >
              <i className={`ri-strikethrough`} />
            </button>

            <button
              className={`menu-item ${editor.isActive('highlight') ? 'is-active' : ''}`}
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              title="Highlight"
            >
              <i className={`ri-mark-pen-line`} />
            </button>

            <div className="divider" />

            <button
              className={`menu-item ${editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}`}
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              title="Align Left"
            >
              <i className={`ri-align-left`} />
            </button>

            <button
              className={`menu-item ${editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}`}
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              title="Align Center"
            >
              <i className={`ri-align-center`} />
            </button>

            <button
              className={`menu-item ${editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}`}
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              title="Align Right"
            >
              <i className={`ri-align-right`} />
            </button>

            <button
              className={`menu-item ${editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}`}
              onClick={() => editor.chain().focus().setTextAlign('justify').run()}
              title="Align Justify"
            >
              <i className={`ri-align-justify`} />
            </button>

            <div className="divider" />

            <button
              className={`menu-item ${editor.isActive('blockquote') ? 'is-active' : ''}`}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              title="Blockquote"
            >
              <i className={`ri-double-quotes-l`} />
            </button>

            <button
              className={`menu-item`}
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              title="Horizontal Rule"
            >
              <i className={`ri-separator`} />
            </button>

            <div className="divider" />

            <button 
              className={`menu-item`}
              onClick={function() { imageRef.current.click() }}
              title="Image"
            >
              <input ref={imageRef} className="hidden" type="file" onChange={addImage}/>
              <i className="ri-image-line" />
            </button>

            <button 
              className={`menu-item`}
              onClick={addYoutubeVideo}
              title="YouTube Video"
            >
              <i className="ri-youtube-line" />
            </button>

            <button 
              className={`menu-item`}
              onClick={function() { fileRef.current.click() }}
              title="File"
            >
              <input ref={fileRef} className="hidden" type="file" onChange={setFile}/>
              <i className="ri-attachment-line" />
            </button>

            <button
              className={`menu-item ${editor.isActive('link') ? 'is-active' : ''}`}
              onClick={setLink}
              title="Link"
            >
              <i className={`ri-link`} />
            </button>
          </div>
        </FloatingMenu>

        <BubbleMenu updateDelay={0} className="bubble-menu" tippyOptions={{ placement: "auto" }} editor={editor}>
          <div className="editor__header">
            <button
              className={`menu-item ${editor.isActive('bold') ? 'is-active' : ''}`}
              onClick={() => editor.chain().focus().toggleBold().run()}
              title="Bold"
            >
              <i className={`ri-bold`} />
            </button>

            <button
              className={`menu-item ${editor.isActive('italic') ? 'is-active' : ''}`}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              title="Italic"
            >
              <i className={`ri-italic`} />
            </button>

            <button
              className={`menu-item ${editor.isActive('strike') ? 'is-active' : ''}`}
              onClick={() => editor.chain().focus().toggleStrike().run()}
              title="Strike"
            >
              <i className={`ri-strikethrough`} />
            </button>

            <button
              className={`menu-item ${editor.isActive('highlight') ? 'is-active' : ''}`}
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              title="Highlight"
            >
              <i className={`ri-mark-pen-line`} />
            </button>

            <div className="divider" />

            <button
              className={`menu-item ${editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}`}
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              title="Align Left"
            >
              <i className={`ri-align-left`} />
            </button>

            <button
              className={`menu-item ${editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}`}
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              title="Align Center"
            >
              <i className={`ri-align-center`} />
            </button>

            <button
              className={`menu-item ${editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}`}
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              title="Align Right"
            >
              <i className={`ri-align-right`} />
            </button>

            <button
              className={`menu-item ${editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}`}
              onClick={() => editor.chain().focus().setTextAlign('justify').run()}
              title="Align Justify"
            >
              <i className={`ri-align-justify`} />
            </button>

            <div className="divider" />

            <button 
              className={`menu-item`}
              onClick={function() { fileRefBubble.current.click() }}
              title="File"
            >
              <input ref={fileRefBubble} className="hidden" type="file" onChange={setFile}/>
              <i className="ri-attachment-line" />
            </button>

            <button
              className={`menu-item ${editor.isActive('link') ? 'is-active' : ''}`}
              onClick={setLink}
              title="Link"
            >
              <i className={`ri-link`} />
            </button>

            <button
              className={`menu-item ${editor.isActive('link') ? 'is-active' : ''}`}
              onClick={() => editor.chain().focus().unsetLink().run()}
              title="Unlink"
              disabled={!editor.isActive('link')}
            >
              <i className={`ri-link-unlink`} />
            </button>
          </div>
        </BubbleMenu>

        <EditorContent editor={editor} />


      </div>
      <UpdateContentButton 
        isLoading={isLoading}
        onClick={handleUpdateContent}  
      />
    </div>
  );
}

function UpdateContentButton({ onClick, isLoading }: any) {
  return (
    <Button 
      type="button" 
      className="absolute top-5 right-3"
      onClick={onClick}
      aria-disabled={isLoading}
    >
      {isLoading ? "Editing Content..." : "Edit Content"}
    </Button>
  );
}
"use client";

import "./content.css";
import "remixicon/fonts/remixicon.css";

import Link from "next/link";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { updateDepartmentAction } from '@/app/lib/actions';
import { useFormState, useFormStatus } from "react-dom";
import { BubbleMenu, EditorContent, FloatingMenu, useEditor } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import TipTapLink from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import Placeholder from "@tiptap/extension-placeholder";
import { baseURL } from "@/app/lib/web/data";
import { useCallback, useRef } from "react";


const CustomDocument = Document.extend({
  content: "heading block+",
});

export default function EditDepartmentForm({ department }: any) {
  const initialState = { message: null, errors: {} };
  const updateDepartmentWithId = updateDepartmentAction.bind(null, department._id);
  const [state, dispatch] = useFormState(updateDepartmentWithId, initialState);

  const imageRef: any = useRef(null);
  const fileRef: any = useRef(null);
  const fileRefBubble: any = useRef(null);

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
      TipTapLink.configure({
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
            return "What’s the department name?";
          }
          return "Start typing here...";
        },
      }),
    ],
    content: department.content,
    editorProps: {
      attributes: {
        spellcheck: "false",
        class: "peer block w-full rounded-md border border-gray-200 py-2 pl-40 text-sm outline-2 placeholder:text-gray-500 bg-white"
      },
    },
  });

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

  return (
    <form action={dispatch}>
      <input type="hidden" name="content" value={editor.getHTML()} />
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Titulo do Departamento */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Nome do Departamento
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                defaultValue={department.title}
                placeholder="Digite o nome do Departamento"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="title-error"
              />
              <BookmarkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {state.errors?.title ? (
            <div
              id="title-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.title.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Descrição do Departamento
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="description"
                name="description"
                type="text"
                defaultValue={department.description}
                placeholder="Digite a Descrição"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="description-error"
              />
              <BookmarkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {state.errors?.description ? (
            <div
              id="description-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.description.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>

        {/* Thumbnail do Departamento */}
        {/* <div className="mb-4">
          <label htmlFor="thumbnail" className="mb-2 block text-sm font-medium">
            Thumbnail do Departamento
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="thumbnail"
                name="thumbnail"
                type="file"
                placeholder="Carregue a Imagem"
                className="block w-full text-sm text-slate-500 rounded-md file:pl-10 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                aria-describedby="thumbnail-error"
              />
              <BookmarkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {state.errors?.thumbnailSize ? (
            <div
              id="description-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.thumbnailSize.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div> */}


        {/* Conteudo do Departamento */}
        <div className="mb-4 prose prose-green prose-zinc marker:text-[#178415] max-w-none">
          <label htmlFor="content" className="mb-2 block text-sm font-medium">
            Conteúdo do Departamento
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <div className="TipTapContainer">
                <EditorContent editor={editor} />
              </div>
              <BookmarkIcon className="pointer-events-none absolute left-3 top-6 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {state.errors?.content ? (
              <div
                id="description-error"
                aria-live="polite"
                className="mt-2 text-sm text-red-500"
              >
                {state.errors.content.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            ) : null}
          </div>

          <div aria-live="polite" aria-atomic="true">
            {state.message && (
              <p className="mt-2 text-sm text-red-500">{state.message}</p>
            )}
          </div>

          <FloatingMenu className="floating-menu" tippyOptions={{ duration: 100, placement: "top-start" }} editor={editor}>
            <div className="editor__header">
              <button
                className={`menu-item ${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}`}
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                title="Heading 1"
                type="button"
              >
                <i className={`ri-h-1`} />
              </button>

              <button
                className={`menu-item ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                title="Heading 2"
                type="button"
              >
                <i className={`ri-h-2`} />
              </button>

              <button
                className={`menu-item ${editor.isActive('paragraph') ? 'is-active' : ''}`}
                onClick={() => editor.chain().focus().setParagraph().run()}
                title="Paragraph"
                type="button"
              >
                <i className={`ri-paragraph`} />
              </button>

              <button
                className={`menu-item ${editor.isActive('bulletList') ? 'is-active' : ''}`}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                title="Bullet List"
                type="button"
              >
                <i className={`ri-list-unordered`} />
              </button>

              <button
                className={`menu-item ${editor.isActive('orderedList') ? 'is-active' : ''}`}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                title="Ordered List"
                type="button"
              >
                <i className={`ri-list-ordered`} />
              </button>

              <button
                className={`menu-item ${editor.isActive('taskList') ? 'is-active' : ''}`}
                onClick={() => editor.chain().focus().toggleTaskList().run()}
                title="Task List"
                type="button"
              >
                <i className={`ri-list-check-2`} />
              </button>
              
              <div className="divider" />

              <button
                className={`menu-item ${editor.isActive('bold') ? 'is-active' : ''}`}
                onClick={() => editor.chain().focus().toggleBold().run()}
                title="Bold"
                type="button"
              >
                <i className={`ri-bold`} />
              </button>

              <button
                className={`menu-item ${editor.isActive('italic') ? 'is-active' : ''}`}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                title="Italic"
                type="button"
              >
                <i className={`ri-italic`} />
              </button>

              <button
                className={`menu-item ${editor.isActive('strike') ? 'is-active' : ''}`}
                onClick={() => editor.chain().focus().toggleStrike().run()}
                title="Strike"
                type="button"
              >
                <i className={`ri-strikethrough`} />
              </button>

              <button
                className={`menu-item ${editor.isActive('highlight') ? 'is-active' : ''}`}
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                title="Highlight"
                type="button"
              >
                <i className={`ri-mark-pen-line`} />
              </button>

              <div className="divider" />

              <button
                className={`menu-item ${editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}`}
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                title="Align Left"
                type="button"
              >
                <i className={`ri-align-left`} />
              </button>

              <button
                className={`menu-item ${editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}`}
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                title="Align Center"
                type="button"
              >
                <i className={`ri-align-center`} />
              </button>

              <button
                className={`menu-item ${editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}`}
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                title="Align Right"
                type="button"
              >
                <i className={`ri-align-right`} />
              </button>

              <button
                className={`menu-item ${editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}`}
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                title="Align Justify"
                type="button"
              >
                <i className={`ri-align-justify`} />
              </button>

              <div className="divider" />

              <button
                className={`menu-item ${editor.isActive('blockquote') ? 'is-active' : ''}`}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                title="Blockquote"
                type="button"
              >
                <i className={`ri-double-quotes-l`} />
              </button>

              <button
                className={`menu-item`}
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                title="Horizontal Rule"
                type="button"
              >
                <i className={`ri-separator`} />
              </button>

              <div className="divider" />

              <button 
                className={`menu-item`}
                onClick={function() { imageRef.current.click() }}
                title="Image"
                type="button"
              >
                <input ref={imageRef} className="hidden" type="file" onChange={addImage}/>
                <i className="ri-image-line" />
              </button>

              <button 
                className={`menu-item`}
                onClick={addYoutubeVideo}
                title="YouTube Video"
                type="button"
              >
                <i className="ri-youtube-line" />
              </button>

              <button 
                className={`menu-item`}
                onClick={function() { fileRef.current.click() }}
                title="File"
                type="button"
              >
                <input ref={fileRef} className="hidden" type="file" onChange={setFile}/>
                <i className="ri-attachment-line" />
              </button>

              <button
                className={`menu-item ${editor.isActive('link') ? 'is-active' : ''}`}
                onClick={setLink}
                title="Link"
                type="button"
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
                type="button"
              >
                <i className={`ri-bold`} />
              </button>

              <button
                className={`menu-item ${editor.isActive('italic') ? 'is-active' : ''}`}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                title="Italic"
                type="button"
              >
                <i className={`ri-italic`} />
              </button>

              <button
                className={`menu-item ${editor.isActive('strike') ? 'is-active' : ''}`}
                onClick={() => editor.chain().focus().toggleStrike().run()}
                title="Strike"
                type="button"
              >
                <i className={`ri-strikethrough`} />
              </button>

              <button
                className={`menu-item ${editor.isActive('highlight') ? 'is-active' : ''}`}
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                title="Highlight"
                type="button"
              >
                <i className={`ri-mark-pen-line`} />
              </button>

              <div className="divider" />

              <button
                className={`menu-item ${editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}`}
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                title="Align Left"
                type="button"
              >
                <i className={`ri-align-left`} />
              </button>

              <button
                className={`menu-item ${editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}`}
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                title="Align Center"
                type="button"
              >
                <i className={`ri-align-center`} />
              </button>

              <button
                className={`menu-item ${editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}`}
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                title="Align Right"
                type="button"
              >
                <i className={`ri-align-right`} />
              </button>

              <button
                className={`menu-item ${editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}`}
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                title="Align Justify"
                type="button"
              >
                <i className={`ri-align-justify`} />
              </button>

              <div className="divider" />

              <button 
                className={`menu-item`}
                onClick={function() { fileRefBubble.current.click() }}
                title="File"
                type="button"
              >
                <input ref={fileRefBubble} className="hidden" type="file" onChange={setFile}/>
                <i className="ri-attachment-line" />
              </button>

              <button
                className={`menu-item ${editor.isActive('link') ? 'is-active' : ''}`}
                onClick={setLink}
                title="Link"
                type="button"
              >
                <i className={`ri-link`} />
              </button>

              <button
                className={`menu-item ${editor.isActive('link') ? 'is-active' : ''}`}
                onClick={() => editor.chain().focus().unsetLink().run()}
                title="Unlink"
                disabled={!editor.isActive('link')}
                type="button"
              >
                <i className={`ri-link-unlink`} />
              </button>
            </div>
          </BubbleMenu>


          {state.errors?.content ? (
            <div
              id="content-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.content.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>
      </div>


      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/dynamics-pages/departments"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <CreateNewsButton />
      </div>
    </form>
  );
}

function CreateNewsButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending}>Salvar Departamento</Button>
  );
}

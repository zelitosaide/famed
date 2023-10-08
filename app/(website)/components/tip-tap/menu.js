"use client";

import "./tip-tap.css";

import { Fragment, useCallback } from "react";
import MenuItem from "./menu-item";

import { baseURL } from "@/app/api/server";

export default function Menu({ editor }) {
  const addImage = useCallback(async (formData) => {
    const res = await fetch(`${baseURL}/files`, { 
      method: "POST", 
      body: formData 
    });

    let data = await res.json();

    if (data.url) {
      editor
        .chain()
        .focus()
        .setImage({ src: `${baseURL}/${data.url}` })
        .run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addYoutubeVideo = () => {
    const url = prompt("Enter YouTube URL");

    if (url) {
      editor.commands.setYoutubeVideo({src: url});
    }
  }

  const items = [
    // {
    //   icon: 'h-1',
    //   title: 'Heading 1',
    //   action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    //   isActive: () => editor.isActive('heading', { level: 1 }),
    // },
    // {
    //   icon: 'h-2',
    //   title: 'Heading 2',
    //   action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    //   isActive: () => editor.isActive('heading', { level: 2 }),
    // },
    // {
    //   icon: 'paragraph',
    //   title: 'Paragraph',
    //   action: () => editor.chain().focus().setParagraph().run(),
    //   isActive: () => editor.isActive('paragraph'),
    // },
    // {
    //   icon: 'list-unordered',
    //   title: 'Bullet List',
    //   action: () => editor.chain().focus().toggleBulletList().run(),
    //   isActive: () => editor.isActive('bulletList'),
    // },
    // {
    //   icon: 'list-ordered',
    //   title: 'Ordered List',
    //   action: () => editor.chain().focus().toggleOrderedList().run(),
    //   isActive: () => editor.isActive('orderedList'),
    // },
    // {
    //   icon: 'list-check-2',
    //   title: 'Task List',
    //   action: () => editor.chain().focus().toggleTaskList().run(),
    //   isActive: () => editor.isActive('taskList'),
    // },
    // {
    //   type: 'divider',
    // },
    {
      icon: 'bold',
      title: 'Bold',
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold'),
    },
    {
      icon: 'italic',
      title: 'Italic',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
    },
    {
      icon: 'strikethrough',
      title: 'Strike',
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive('strike'),
    },
    {
      icon: 'mark-pen-line',
      title: 'Highlight',
      action: () => editor.chain().focus().toggleHighlight().run(),
      isActive: () => editor.isActive('highlight'),
    },
    {
      type: 'divider',
    },
    {
      icon: 'align-left',
      title: 'Align Left',
      action: () => editor.chain().focus().setTextAlign('left').run(),
      isActive: () => editor.isActive({ textAlign: 'left' }),
    },
    {
      icon: 'align-center',
      title: 'Align Center',
      action: () => editor.chain().focus().setTextAlign('center').run(),
      isActive: () => editor.isActive({ textAlign: 'center' }),
    },
    {
      icon: 'align-right',
      title: 'Align Right',
      action: () => editor.chain().focus().setTextAlign('right').run(),
      isActive: () => editor.isActive({ textAlign: 'right' }),
    },
    {
      icon: 'align-justify',
      title: 'Align Justify',
      action: () => editor.chain().focus().setTextAlign('justify').run(),
      isActive: () => editor.isActive({ textAlign: 'justify' }),
    },
    // {
    //   type: 'divider',
    // },
    // {
    //   icon: 'double-quotes-l',
    //   title: 'Blockquote',
    //   action: () => editor.chain().focus().toggleBlockquote().run(),
    //   isActive: () => editor.isActive('blockquote'),
    // },
    // {
    //   icon: 'separator',
    //   title: 'Horizontal Rule',
    //   action: () => editor.chain().focus().setHorizontalRule().run(),
    // },
    {
      type: 'divider',
    },
    // {
    //   icon: 'image-line',
    //   title: 'Image',
    //   action: addImage,
    // },
    // {
    //   icon: 'youtube-line',
    //   title: 'YouTube Video',
    //   action: addYoutubeVideo,
    // },
    {
      icon: 'link',
      title: 'Link',
      action: setLink,
      isActive: () => editor.isActive('link'),
    },
    {
      icon: 'link-unlink',
      title: 'Unlink',
      action: () => editor.chain().focus().unsetLink().run(),
      disabled: !editor.isActive('link'),
    },
    // {
    //   type: 'divider',
    // },
    // {
    //   icon: 'format-clear',
    //   title: 'Clear Format',
    //   action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
    // },
    // {
    //   icon: 'arrow-go-back-line',
    //   title: 'Undo',
    //   action: () => editor.chain().focus().undo().run(),
    // },
    // {
    //   icon: 'arrow-go-forward-line',
    //   title: 'Redo',
    //   action: () => editor.chain().focus().redo().run(),
    // },
  ];


  return (
    <div className="editor__header">
      {items.map((item, index) => (
        <Fragment key={index}>
          {item.type === 'divider' ? <div className="divider" /> : <MenuItem {...item} />}
        </Fragment>
      ))}
    </div>
  );
}
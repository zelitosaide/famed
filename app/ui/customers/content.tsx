"use client";

import "./content.css";

import { EditorContent, FloatingMenu, useEditor } from "@tiptap/react";
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
import { useState } from "react";
import { Button } from "../button";
import { updateContent } from "@/app/lib/web/data";
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

  const [isLoading, setIsLoading] = useState(false);

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
  // className="bg-gray-50"

  return (
    <div 
      style={{ paddingRight: 180 }} 
      className="prose prose-green prose-zinc marker:text-[#178415] max-w-none relative"
    >
      <div className="bg-gray-50">
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
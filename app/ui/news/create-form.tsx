"use client";

import "./content.css";
import "remixicon/fonts/remixicon.css";

// import { CustomerField } from "@/app/lib/definitions";
import Link from "next/link";
import {
  BookmarkIcon,
  // CheckIcon,
  // ClockIcon,
  // CurrencyDollarIcon,
  // UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { createInvoice } from '@/app/lib/actions';
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

export default function Form({ departaments }: any) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createInvoice, initialState);

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
            return "What’s the title?";
          }
          return "Start typing here...";
        },
      }),
    ],
    // content: "",
    editorProps: {
      attributes: {
        spellcheck: "false",
        // class: `focus:outline outline-blue-300 focus:outline-dashed focus:rounded-lg focus:outline-2`
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
        {/* Titulo da Notícia */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Título da Notícia
          </label>
          {/* <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div> */}
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Digite o Título"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="title-error"
              />
              <BookmarkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {/* {state.errors?.customerId ? (
            <div
              id="customer-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.customerId.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null} */}
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
            Descrição da Notícia
          </label>
          {/* <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amount-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div> */}
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="description"
                name="description"
                type="text"
                placeholder="Digite a Descrição"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="description-error"
              />
              <BookmarkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {/* {state.errors?.amount ? (
            <div
              id="amount-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.amount.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null} */}
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

        {/* Imagem da Notícia */}
        <div className="mb-4">
          <label htmlFor="image" className="mb-2 block text-sm font-medium">
            Imagem da Notícia
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="image"
                name="image"
                type="file"
                placeholder="Carregue a Imagem"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="image-error"
              />
              <BookmarkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>


        {/* Departamento da Notícia */}
        <div className="mb-4">
          <label htmlFor="department" className="mb-2 block text-sm font-medium">
            Escolha o Departamento
          </label>
          <div className="relative">
            <select
              id="department"
              name="department"
              defaultValue=""
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            >
              <option value="" disabled>
                Selecione o departamento
              </option>
              {departaments.map((depart: any) => (
                <option key={depart} value={depart}>
                  {depart}
                </option>
              ))}
            </select>
            <BookmarkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>








        {/* Conteudo da Notícia */}
        <div className="mb-4 prose prose-green prose-zinc marker:text-[#178415] max-w-none">
          <label htmlFor="content" className="mb-2 block text-sm font-medium">
            Conteúdo da Notícia
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              {/* <input
                id="content"
                name="content"
                type="text"
                defaultValue={news.content}
                placeholder="Digite o Título"
                className="peer block w-full border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="content-error"
              /> */}
              <div className="TipTapContainer">
                <EditorContent editor={editor} />
              </div>
              <BookmarkIcon className="pointer-events-none absolute left-3 top-6 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
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





        




        {/* Invoice Status */}
        {/* <fieldset aria-describedby="status-error">
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white dark:text-gray-300"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          {state.errors?.status ? (
            <div
              id="status-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.status.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </fieldset>
        {state.message ? (
          <div
            // id="customer-error"
            aria-live="polite"
            className="mt-2 text-sm text-red-500"
          >
            <p>{state.message}</p>
          </div>
        ) : null} */}



      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices/news"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        {/* <Button type="submit">Create Invoice</Button> */}
        <CreateInvoiceButton />
      </div>
    </form>
  );
}

function CreateInvoiceButton() {
  const { pending } = useFormStatus();
 
  return (
    <Button type="submit" aria-disabled={pending}>Criar Notícia</Button>
  );
}

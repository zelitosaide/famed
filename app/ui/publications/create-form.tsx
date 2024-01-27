"use client";

import "remixicon/fonts/remixicon.css";

import { BookmarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/button";

import { useFormState, useFormStatus } from "react-dom";
import { createPublicationAction } from "@/app/lib/actions";

import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState } from "react";


export default function CreatePublicationForm({ departaments }: any) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createPublicationAction, initialState);
  const [authors, setAuthors] = useState<string[]>([]);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Titulo da Publicação */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Título da Publicação
          </label>
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

        {/* Revista */}
        <div className="mb-4">
          <label htmlFor="review" className="mb-2 block text-sm font-medium">
            Revista
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="review"
                name="review"
                type="text"
                placeholder="Digite a revista"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="review-error"
              />
              <BookmarkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {state.errors?.review ? (
            <div
              id="review-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.review.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>
             
        {/* Departamento, PMID e Data de Publicação */}
        <div className="mb-4">
          <div className="flex gap-2">
            <div className="flex-1">
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
              {state.errors?.department ? (
                <div
                  id="description-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {state.errors.department.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="flex-1">
              <label htmlFor="pmid" className="mb-2 block text-sm font-medium">
                PMID
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="pmid"
                    name="pmid"
                    type="text"
                    placeholder="Digite o PMID"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby="pmid-error"
                  />
                  <BookmarkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
              {state.errors?.pmid ? (
                <div
                  id="pmid-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {state.errors.pmid.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="flex-1">
              <label htmlFor="publicationDate" className="mb-2 block text-sm font-medium">
                Data de Publicação
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="publicationDate"
                    name="publicationDate"
                    type="date"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby="publicationDate-error"
                  />
                  <BookmarkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
              {state.errors?.publicationDate ? (
                <div
                  id="approvalDate-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {state.errors.publicationDate.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* URL da Publicação */}
        <div className="mb-4">
          <label htmlFor="url" className="mb-2 block text-sm font-medium">
            Link da publicação
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="url"
                name="url"
                // type="url"
                placeholder="Digite o Link da publicaçã (https://example.com)"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="url-error"
              />
              <BookmarkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {state.errors?.url ? (
            <div
              id="url-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.url.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>


        {/* Autores */}
        <div className="mb-4">
          <label htmlFor="authors" className="mb-2 block text-sm font-medium">
            Autores
          </label>
          <div className="relative mt-2 rounded-md">
            <Autocomplete
              multiple
              options={[]}
              freeSolo
              renderTags={(value: readonly string[], getTagProps) =>
                value.map((option: string, index: number) => (
                  <Chip variant="outlined" {...getTagProps({ index })} label={option} key={option} />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  // variant="filled"
                  placeholder="Digite o nome do Autor"
                />
              )}
              value={authors}
              onChange={function(event: React.SyntheticEvent, value: string[], reason: string) {
                setAuthors(value);
              }}
            />
          </div>
          <input type="hidden" name="authors" value={authors.join("#")} />
          {state.errors?.authors ? (
            <div
              id="authors-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.authors.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>

        
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/dynamics-pages/publications"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <UpdateInvoiceButton />
      </div>
    </form>
  );
}

function UpdateInvoiceButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending}>Salvar Publicação</Button>
  );
}


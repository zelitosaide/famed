import Link from "next/link";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { deletePublicationAction } from "@/app/lib/actions";

export function CreatePublication() {
  return (
    <Link
      href="/dashboard/dynamics-pages/publications/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Criar Publicação</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdatePublication({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/dynamics-pages/publications/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeletePublication({ id }: { id: string }) {
  const deletePublicationWithId = deletePublicationAction.bind(null, id);
  return (
    <form action={deletePublicationWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
import { formatDateToLocal } from "@/app/lib/utils";
import { getPublications } from "@/app/lib/web/data";
import { DeletePublication, UpdatePublication } from "./buttons";

export default async function PublicationsTable({ query, currentPage }: {
  query: string;
  currentPage: number;
}) {
  const publications = await getPublications(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {publications?.map((pub: any) => (
              <div
                key={pub._id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{pub.title}</p>
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>{formatDateToLocal(pub.publicationDate)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdatePublication id={pub._id} />
                    <DeletePublication id={pub._id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Título da Publicação
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Data da Publicação
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {publications?.map((pub: any) => (
                <tr
                  key={pub._id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{pub.title.length > 100 ? `${pub.title.slice(0, 100) }...`: pub.title}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(pub.publicationDate)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdatePublication id={pub._id} />
                      <DeletePublication id={pub._id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

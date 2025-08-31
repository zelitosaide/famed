import { fetchPublicationsPages } from "@/app/lib/web/data";
import Pagination from "@/app/ui/pagination";
import H1 from "@/app/ui/web/h1";
import Publicacoes from "@/app/ui/web/publicacoes/publicacoes";
import { Suspense } from "react";
import PublicationFilter from "./filter";

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string; year?: string };
}) {
  const query = searchParams?.query || "";
  const year = searchParams?.year || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchPublicationsPages(query);

  return (
    <div className="pt-2.5 pr-3 pl-5 pb-5">
      <div className="justify-between mb-4 flex flex-col sm:flex-row sm:items-center">
        <H1>Publicações da Faculdade</H1>
        <PublicationFilter />
      </div>

      <Suspense
        key={query + currentPage}
        fallback={
          <p style={{ marginTop: 16 }} className="bg-gray-50 pl-4 pt-1 pb-1">
            Loading...
          </p>
        }
      >
        <Publicacoes query={query} currentPage={currentPage} year={year} />
      </Suspense>
      <div className="mt-12 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

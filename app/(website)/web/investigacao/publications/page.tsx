import { fetchPublicationsPages } from "@/app/lib/web/data";
import Pagination from "@/app/ui/pagination";
import H1 from "@/app/ui/web/h1";
import Publicacoes from "@/app/ui/web/publicacoes/publicacoes";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchPublicationsPages(query);
  
  return (
    <div className="pt-2.5 pr-3 pl-5 pb-5">
      <H1>Publicações da Faculdade</H1>
      <Suspense key={query + currentPage} fallback={
        <p style={{ marginTop: 16 }} className="bg-gray-50 pl-4 pt-1 pb-1">
          Loading...
        </p>
      }>
        <Publicacoes query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-12 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
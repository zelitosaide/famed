import { fetchDepartmentsPages } from "@/app/lib/web/data";
import { CreateDepartment } from "@/app/ui/departments/buttons";
import DepartmentsTable from "@/app/ui/departments/departments-table";
import Pagination from "@/app/ui/pagination";
import Search from "@/app/ui/search";
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
  const totalPages = await fetchDepartmentsPages(query);

  return (
    <div className="w-full">
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Pesquisar Departamentos..." />
        <CreateDepartment />
      </div>
      <Suspense key={query + currentPage} fallback={
        <p style={{ marginTop: 16 }} className="bg-gray-50 pl-4 pt-1 pb-1">
          Loading...
        </p>
      }>
        <DepartmentsTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
// import { getProjects } from "@/app/lib/web/data";
// import Link from "next/link";

// export default async function Page() {
//   const projects = await getProjects();

//   return (
//     <div>
//       <h1>Projects</h1>
//       <ul>
//         {projects.map(function(project: any) {
//           return (
//             <li key={project._id}>
//               <Link href={`/dashboard/invoices/projects/${project._id}/edit`}>
//                 {project.title}
//               </Link>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

import { CreateProject } from "@/app/ui/invoices/buttons";
import Search from "@/app/ui/news/search";
import ProjectsTable from "@/app/ui/projects/projects-table";
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
  // const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Pesquisar Projecto..." />
        <CreateProject />
      </div>
      <Suspense key={query + currentPage} fallback={
        <p style={{ marginTop: 16 }} className="bg-gray-50 pl-4 pt-1 pb-1">
          Loading...
        </p>
      }>
        <ProjectsTable query={query} currentPage={currentPage} />
      </Suspense>
      {/* <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div> */}
    </div>
  );
}
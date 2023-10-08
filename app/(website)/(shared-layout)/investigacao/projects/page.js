import { getProjects } from "@/app/api/server";
import Projects from "./projects";

export default async function Page() {
  const projects = await getProjects();
  
  return (
    <div className="pt-2.5 pr-3 pl-5 pb-5">
      <h1>Projectos de Pesquisa da Faculdade</h1>

      <Projects projects={projects} />

    </div>
  );
}

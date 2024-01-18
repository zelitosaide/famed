import { getProjects } from "@/app/lib/web/data";
import H1 from "@/app/ui/web/h1";
import Projectos from "@/app/ui/web/projectos/projectos";

export default async function Page() {
  const projectos = await getProjects("", 100);
  
  return (
    <div className="pt-2.5 pr-3 pl-5 pb-5">
      <H1>Projectos de Pesquisa da Faculdade</H1>
      <Projectos projectos={projectos} />
    </div>
  );
}
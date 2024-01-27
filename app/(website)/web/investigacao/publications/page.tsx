import { getPublications } from "@/app/lib/web/data";
import H1 from "@/app/ui/web/h1";
import Publicacoes from "@/app/ui/web/publicacoes/publicacoes";

export default async function Page() {
  const publicacoes = await getPublications("", 1);
  
  return (
    <div className="pt-2.5 pr-3 pl-5 pb-5">
      <H1>Publicações da Faculdade</H1>
      <Publicacoes publicacoes={publicacoes} />
    </div>
  );
}
import { getLinks } from "@/app/lib/web/data";
import Nav from "./nav";

export default async function NavLinks() {
  const headerLinks = await getLinks("cabecalho");
  const sobreFaculdade = headerLinks.find((item: any) => item.title === "Sobre a Faculdade");
  const navLinks = await getLinks("nav");
  const nav = navLinks.filter((item: any) => item.title !== "Página Inicial" && item.title !== "Notícias");
  const links = [ sobreFaculdade, ...nav ];

  return (
    <div>
      <Nav links={links} />
    </div>
  );
}
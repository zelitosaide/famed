import Nav from "./nav";

export default async function NavLinks() {
  const links = [
    { title: "Notícias", segment: "news" },
    { title: "Projectos", segment: "projects" },
    { title: "Publicações", segment: "/publications" },
    { title: "Cursos de curta duração", segment: "/courses" },
    { title: "Departamentos e Unidades", segment: "/departments" },
    { title: "Consultas de Bioestatística", segment: "/consultations" },
  ];

  return (
    <div>
      <Nav links={links} />
    </div>
  );
}
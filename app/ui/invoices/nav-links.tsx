import Nav from "./nav";

export default async function NavLinks() {
  const links = [
    { title: "Notícias", segment: "news" },
    { title: "Projectos", segment: "projects" },
    { title: "Publicações", segment: "/publications" },
  ];

  return (
    <div>
      <Nav links={links} />
    </div>
  );
}
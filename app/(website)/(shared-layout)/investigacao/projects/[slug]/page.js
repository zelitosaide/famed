import { getProjectById } from "@/app/api/server";

export default async function Page({ params }) {
  const project = await getProjectById(params.slug);

  return (
    <div className="pt-2.5 pr-3 pl-5 pb-5">
      <h1>{project.title}</h1>
    </div>
  );
}
import { getProjectById, getProjects } from "@/app/lib/web/data";
import Content from "@/app/ui/web/content";
import ShareButtons from "@/app/ui/web/share-buttons";
import { Metadata } from "next";
import { notFound } from "next/navigation";





export async function generateMetadata({ 
  params 
}: { 
  params: { id: string }
}): Promise<Metadata> {
  const { id } = params;
  const project = await getProjectById(id);

  if (!project) {
    return {}
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      // description: project.description,
      description: project.description.length < 160 ? project.description : project.description.slice(0, 160) + "...",
      type: "article",
      publishedTime: project.createdAt,
      authors: ["Blog Author"],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      // description: project.description,
      description: project.description.length < 160 ? project.description : project.description.slice(0, 160) + "..."
    },
  }
}

export async function generateStaticParams() {
  const projects = await getProjects("", 1)
  // const projects = await getNews(query, currentPage);

  return projects.map((project: any) => ({
    id: project._id,
  }))
}



export default async function Page({ params }: any) {
  const { id } = params;
  const project = await getProjectById(params.id);

  if (!project) {
    notFound();
  }

  const url = `https://med.uem.mz/web/investigacao/projects/${id}`

  return (
    <div className="pt-2.5 pr-3 pl-5 pb-5">
      <div>
        <div className="flex justify-end items-center gap-2">
          <h2 className="text-base font-semibold text-gray-700 bg-yellow-50 px-2">Partilhar Projecto </h2>
          <ShareButtons url={url} title={project.description} />
        </div>
        <div className="mb-6" />
      </div>

      <Content content={project.content} id={project._id} />
    </div>
  );
}
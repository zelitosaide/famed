import { getNews, getNewsById } from "@/app/lib/web/data";
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
  const noticia = await getNewsById(id);

  if (!noticia) {
    return {}
  }

  return {
    title: noticia.title,
    description: noticia.description,
    openGraph: {
      title: noticia.title,
      description: noticia.description,
      type: "article",
      publishedTime: noticia.date,
      authors: ["Blog Author"],
    },
    twitter: {
      card: "summary_large_image",
      title: noticia.title,
      description: noticia.description,
    },
  }
}

export async function generateStaticParams() {
  const noticias = await getNews("", 1, 1000)
  // const noticias = await getNews(query, currentPage);

  return noticias.map((noticia: any) => ({
    id: noticia._id,
  }))
}

export default async function Page({ params }: { params: { id: string }}) {
  const { id } = params;
  const noticia = await getNewsById(id);

  if (!noticia) {
    notFound();
  }

  // const url = `https://med.uem.mz/web/noticias/${id}`
  // const url = `https://med.uem.mz`
  
  // const url = `${process.env.NEXT_PUBLIC_SITE_URL || "https://med.uem.mz"}/web/noticias/${id}`
  const url = `https://med.uem.mz/web/noticias/${id}`


  return (
    <div className="pt-2.5 pr-3 pl-5 pb-5">
      <div>
        <div className="flex justify-end items-center gap-2">
          <h2 className="text-base font-semibold text-gray-700 bg-yellow-50 px-2">Partilhar Notícia </h2>
          <ShareButtons url={url} title={noticia.description} />
        </div>
        <div className="mb-6" />
      </div>
      <Content content={noticia.content} id={noticia._id} />
    </div>
  );
}
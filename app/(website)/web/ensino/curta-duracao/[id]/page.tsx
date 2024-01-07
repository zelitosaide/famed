import { getCourseById } from "@/app/lib/web/data";
import H1 from "@/app/ui/web/h1";
import YouTubePlayer from "./youtube-player";
import Controls from "./controls";

export default async function Page({ params }: any) {
  const curso = await getCourseById(params.id);

  console.log(curso);

  return (
    <div className="pt-2.5 pr-3 pl-5 pb-5">
      <H1>{curso.title}</H1>
      <div className="flex">
        <div className="bg-red-100 flex-1">
          <YouTubePlayer />
        </div>
        <div className="bg-blue-200 w-60">
          <Controls />
        </div>
      </div>
    </div>
  );
}
import { getCourseById } from "@/app/lib/web/data";
import H1 from "@/app/ui/web/h1";
import YouTubePlayer from "./youtube-player";
import Controls from "./controls";

export default async function Page({ 
  params, 
  searchParams 
}: {
  params: { id: string };
  searchParams?: { videoId?: string, videoTitle?: string };
}) {
  const course = await getCourseById(params.id);
  const { youtubeApiKey, playlistId } = course;
  const youtubeBaseUrl = "https://www.googleapis.com/youtube/v3/playlistItems?";
  const res = await fetch(`${youtubeBaseUrl}part=snippet&playlistId=${playlistId}&maxResults=50&key=${youtubeApiKey}`);
  const { items: list } = await res.json();
  const videoId = searchParams?.videoId || list[0].snippet.resourceId.videoId;
  const videoTitle = searchParams?.videoTitle || list[0].snippet.title;

  return (
    <div className="pt-2.5 pr-3 pl-5 pb-5">
      <H1>{course.title}</H1>

      <div className="flex gap-5">
        <div className="flex-1">
          <p 
            className="py-3 px-2 block bg-[#E2F0E2] font-bold text-[#178415]"
            style={{ outline: "5px solid #E2F0E2" }}
          >
            {course.title}: <span className="font-medium">{videoTitle}</span>
          </p>
          <YouTubePlayer videoId={videoId} />
        </div>
        <div 
          className="w-60 bg-[#F2F8F2] shadow" 
          style={{ outline: "5px solid #F2F8F2" }}
        >
          <p className="py-3 px-2 block bg-[#E2F0E2] font-bold text-[#178415]">
            Conteúdo do Curso
          </p>
          <Controls list={list} videoId={videoId} />
        </div>
      </div>
    </div>
  );
}
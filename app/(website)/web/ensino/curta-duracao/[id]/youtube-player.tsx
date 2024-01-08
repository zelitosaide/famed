"use client";

import YouTube from "react-youtube";

export default function YouTubePlayer({ videoId }: { videoId: string }) {
  const opts = {
    height: "384",
    playerVars: { autoplay: 0 },
  };

  const _onReady = (event: any) => {
    event.target.pauseVideo();
  }

  return (
    <div className="bg-[#F2F8F2]">
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={_onReady}
      />
    </div>
  );
}
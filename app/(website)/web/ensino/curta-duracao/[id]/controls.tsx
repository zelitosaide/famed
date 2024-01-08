"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { PlayCircleIcon } from "@heroicons/react/24/outline";

export default function Controls({ list, videoId: vId }: { list: any; videoId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (videoId: string, videoTitle: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("videoId", videoId);
    params.set("videoTitle", videoTitle);
    return `${pathname}?${params.toString()}`;
  };

  return (
    <ul className="h-96 overflow-auto">
      {list.map(function(value: any) {
        const { snippet, id } = value;
        const { title, resourceId: { videoId } } = snippet;
        return (
          <li key={id}>
            <Link 
              href={createPageURL(videoId, title)}
              style={{ marginBottom: 1 }}
              className={clsx(
                "block text-sm px-1 py-3 text-[#178415] border-b border-[#CDE5CD] hover:bg-[#CDE5CD] transition-all flex justify-start items-center gap-2",
                {
                  "bg-[#CDE5CD]": videoId === vId,
                  "bg-[#F2F8F2]": videoId !== vId
                }
              )}
            >
              <PlayCircleIcon className="w-5" />
              <span className="flex-1">{title}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
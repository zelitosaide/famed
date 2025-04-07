import { ImageResponse } from "next/og"
import { getNewsById } from "@/app/lib/web/data"
import { formatDateToLocal } from "@/app/lib/utils"

export const runtime = "edge"

export const alt = "News thumbnail"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image({ 
  params 
}: { 
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const news = await getNewsById(id)

  if (!news) {
    return new ImageResponse(
      <div
        style={{
          fontSize: 48,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#333",
        }}
      >
        News Not Found
      </div>,
      {
        ...size,
      },
    )
  }

  return new ImageResponse(
    <div
      style={{
        fontSize: 48,
        background: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        padding: 50,
        color: "#333",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 24,
          color: "#666",
        }}
      >
        Faculdade de Medicina UEM | Notícia
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginTop: 30,
          marginBottom: 30,
        }}
      >
        <div
          style={{
            fontSize: 60,
            fontWeight: "bold",
            marginBottom: 20,
            lineHeight: 1.2,
          }}
        >
          {news.title}
        </div>
        <div
          style={{
            fontSize: 30,
            color: "#666",
          }}
        >
          {news.description}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 24,
          color: "#666",
        }}
      >
        {formatDateToLocal(news.createdAt)}
      </div>
    </div>,
    {
      ...size,
    },
  )
}


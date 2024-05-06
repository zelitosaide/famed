"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./carousel.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Keyboard } from "swiper/modules";

import Link from "next/link";
import { DoubleArrowRightIcon } from "@radix-ui/react-icons";

import { baseURL } from "@/app/lib/web/data";

export default function Carousel({ news }: any) {
  const pagination = {
    clickable: true,
    renderBullet: function (index: any, className: string) {
      return `<span class="${className}">${(index + 1)}</span>`;
    }, 
  };   

  const noticias = news.filter(function(news: any) {
    return news._id !== "6515296f13b350c34957b033" && news._id !== "65152d3613b350c34957b064";
  });

  return (
    <Swiper
      cssMode={true}
      navigation={true}
      autoplay={{
        delay: 25000,
        disableOnInteraction: false,
      }}
      loop={true}
      keyboard={true}
      modules={[Autoplay, Navigation, Pagination, Keyboard]}
      pagination={pagination}
    >
      {noticias.map(function(news: any) {
        return (
          <SwiperSlide key={news._id}>
            <img
              src={`${baseURL}/${news.image}`}
              alt="Image3"
              className="shadow-sm shadow-[#ddeedd] border border-[#E2F0E2]"
            />
            <div>
              {/* <Link 
                className="carousel-title hover:underline" 
                href={`/web/noticias/${news._id}`}
              >
                {news.title}
              </Link> */}
              <Link 
                className="carousel-content"
                href={`/web/noticias/${news._id}`}
              >
                {news.title}
              </Link>
              {/* <p className="carousel-content">
                {news.description.length <= 100 ? news.description : `${news.description.slice(0, 100)}...`}
              </p> */}
              <Link className="carousel-button" href={`/web/noticias/${news._id}`}>
                Ver mais <DoubleArrowRightIcon />
              </Link>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
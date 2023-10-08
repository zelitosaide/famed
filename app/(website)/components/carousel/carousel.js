"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./carousel.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";

import Link from "next/link";
import { DoubleArrowRightIcon } from "@radix-ui/react-icons";

import { baseURL } from "@/app/api/server";

export default function Carousel({ news }) {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class="${className}">${(index + 1)}</span>`;
    }, 
  };   

  const noticias = news.filter(function(news) {
    return news._id !== "6515296f13b350c34957b033" && news._id !== "65152d3613b350c34957b064";
  });

  return (
    <Swiper
      cssMode={true}
      navigation={true}
      keyboard={true}
      modules={[Navigation, Pagination, Keyboard]}
      pagination={pagination}
    >
      {noticias.map(function(news) {
        return (
          <SwiperSlide key={news._id}>
            <img
              src={`${baseURL}/${news.image}`}
              alt="Image3"
              className="shadow-sm shadow-[#ddeedd] border border-[#E2F0E2]"
            />
            <div>
              <Link 
                className="carousel-title hover:underline" 
                href={`/noticias/${news._id}`}
              >
                {news.title}
              </Link>
              <p className="carousel-content">
                {news.description.length <= 200 ? news.description : `${news.description.slice(0, 200)}...`}
              </p>
              <Link className="carousel-button" href={`/noticias/${news._id}`}>
                Ver mais <DoubleArrowRightIcon />
              </Link>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
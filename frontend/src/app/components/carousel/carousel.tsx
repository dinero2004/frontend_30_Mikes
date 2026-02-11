"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface WeaponSlide {
  image: string;
  title?: string;
  description?: string;
}

interface CarouselProps {
  images?: string[];
  slides?: WeaponSlide[];
}

export default function Carousel({ images, slides }: CarouselProps) {
  const data: WeaponSlide[] =
    slides ??
    images?.map((img) => ({ image: img })) ??
    [];

  return (
    <div className="flex justify-center">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={40}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        className="weapon-swiper max-w-lg"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            {/* CARD */}
            <div className="bg-black/50 rounded-xl px-8 pt-8 pb-12 text-center">
              
              {/* IMAGE WRAPPER */}
              <div className="relative flex justify-center items-center mb-6">
                <img
                  src={item.image}
                  alt={item.title ?? "weapon"}
                  className="h-36 object-contain"
                />
              </div>

              {item.title && (
                <h3 className="text-lg font-semibold text-gray-200">
                  {item.title}
                </h3>
              )}

              {item.description && (
                <p className="mt-2 text-sm text-gray-400 max-w-md mx-auto">
                  {item.description}
                </p>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}


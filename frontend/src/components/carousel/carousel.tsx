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
    slides ?? images?.map((img) => ({ image: img })) ?? [];

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-5xl bg-black/50 rounded-xl px-16 pt-12 pb-16">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={60}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop
          className="weapon-swiper"
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="text-center">
                <div className="flex justify-center items-center mb-6">
                  <img
                    src={item.image}
                    alt={item.title ?? "weapon"}
                    className="h-96 object-contain"
                  />
                </div>

                {item.title && (
                  <h3 className="text-2xl font-semibold text-gray-200">
                    {item.title}
                  </h3>
                )}

                {item.description && (
                  <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
                    {item.description}
                  </p>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

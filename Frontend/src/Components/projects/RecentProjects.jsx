import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import '../../style/swiper-custom.css'; 

const projects = [
  {
    title: 'Password Generator',
    description:
      "This website will generate a random password. Depending on the chosen criteria we'll have a...",
    image: '/images/jisan.jpg',
  },
  {
    title: 'Personal Blog API',
    description:
      'A RESTful API that would power a personal blog. The client interface can be found...',
    image: '/images/blog-api.png',
  },
  {
    title: 'Weather App',
    description: 'A simple weather app using an open weather API.',
    image: '/images/weather-app.png',
  },
  {
    title: 'Portfolio Website',
    description:
      'A personal portfolio website showcasing projects and skills.',
    image: '/images/portfolio.png',
  },
];

export default function RecentProjects() {
  return (
    <div className="bg-[#0F172A] py-10 px-4 sm:px-6 w-full">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-green-500 uppercase font-bold text-sm mb-6">
          Recent Projects
        </h2>

        {/* Carousel container with arrows outside */}
        <div className="relative flex items-center">
          {/* Left Arrow */}
          <div className="!hidden sm:!flex swiper-button-prev -ml-10 z-10 w-10 h-10 rounded-full hover:bg-white/20 text-white items-center justify-center cursor-pointer" />

          {/* Swiper */}
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
            spaceBetween={30}
            slidesPerView={'auto'}
            grabCursor={true}
            centeredSlides={false}
          >
            {projects.map((project, index) => (
              <SwiperSlide
                key={index}
                className="!w-[90%] md:!w-[46%] lg:!w-[44%]"
              >
                <div className="rounded-xl border border-gray-700 hover:scale-105 duration-500 overflow-hidden min-h-[300px] shadow-md">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-white font-semibold text-lg">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm mt-2">
                      {project.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Right Arrow */}
          <div className="swiper-button-next -mr-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

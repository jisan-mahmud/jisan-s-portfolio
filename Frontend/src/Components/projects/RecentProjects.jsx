import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import '../../style/swiper-custom.css';
import { FaGithub } from "react-icons/fa";
import IconButton from '../button/IconButton';
import { TbWorld } from "react-icons/tb";

const projects = [
  {
    title: 'Picgenre - Automate Your Stock Success',
    description:
      'Transform your microstock workflow with AI-powered tools that make metadata management fast, efficient, and more profitable.',
    image: '/images/picgenre_project.jpg',
    live_link: 'picgenre.com'
  },
  {
    title: 'DeepErase: AI-Powered Background Removal Tool',
    description:
      'DeepErase is an intuitive GUI desktop application designed to help users effortlessly remove backgrounds from images using advanced AI technology.',
    image: '/images/deeperase_project.jpg',
    github_link: 'https://github.com/jisan-mahmud/Background-remover-gui-app',
  },
  {
    title: 'IngredientAI: Instant Recipes from Food Images',
    description:
      'IngredientAI converts food images into detailed recipes and provides step-by-step instructions for making them. ',
    image: '/images/ingredientai_project.jpg',
    github_link: 'https://github.com/jisan-mahmud/ingredientai',
    live_link: 'https://ingredientai.pythonanywhere.com/'
  },
  {
    title: 'Ecare - Appointment Booking Project',
    description:
      "The Appointment Booking System for the eCare Hospital Management System is designed to streamline the process of scheduling appointments between patients and doctors.",
    image: '/images/ecare_project.jpg',
    github_link: 'https://github.com/jisan-mahmud/ecare_backend'
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
                <div className="group relative rounded-xl border border-gray-700 hover:scale-105 duration-500 overflow-hidden min-h-[300px] shadow-md">

                  {/* Image with blur on hover */}
                  <div className="relative w-full h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition duration-300 group-hover:blur-sm"
                    />

                    {/* Buttons over the image */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                      <div className="flex gap-4">
                        {project.github_link && (
                          <IconButton link={project.github_link} className={'hover:!bg-transparent hover:!text-black'} icon={<FaGithub />} />
                        )}
                        {project.live_link && (
                            <IconButton link={project.live_link} className={'hover:!bg-transparent hover:!text-black'} icon={<TbWorld />} />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="p-4">
                    <h3 className="text-white font-semibold text-lg">{project.title}</h3>
                    <p className="text-gray-300 text-sm mt-2">{project.description}</p>
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

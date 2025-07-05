import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";

export default function AboutMe() {
    const [showMore, setShowMore] = useState(false);

    return (
        <div className='w-full px-4 sm:px-6 my-10'>
            <div className='max-w-3xl mx-auto'>
                <h1 className='text-green-600 my-4 font-bold uppercase'>About Me</h1>

                <div className='flex flex-col gap-4'>
                    {/* Always visible part */}
                    <div>
                        I'm a passionate developer with a strong interest in various technology fields, including web development (with a primary focus on backend systems), cloud computing, data, game development, and AI. I'm also deeply intrigued by business entrepreneurship and the intersection of technology and innovation. With over 1 year of experience, I've honed my skills through personal projects and enjoy continuously learning and exploring new technologies to expand my expertise.
                    </div>

                    {/* Toggleable part */}
                    <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                            showMore ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                        }`}
                    >
                        <div className='flex flex-col gap-3 mt-2'>
                            <span>
                                I hold a Bachelor's degree in Mechanical Engineering from the École Polytechnique de Lomé (EPL). Over the past year, I have transitioned into the field of computer science, driven by my passion for technology and problem-solving. I am currently pursuing a two-year Master's degree in Artificial Intelligence and Big Data at the Collège de Paris Supérieur, where I am further deepening my expertise in cutting-edge technologies.
                            </span>

                            <span>
                                When I'm not coding, I spend my time listening to music, reading books, working out at the gym, and playing games or enjoying manga/anime.
                            </span>
                        </div>
                    </div>
                </div>

                {/* Toggle Button */}
                <div
                    className='flex items-center gap-1 mt-4 cursor-pointer select-none text-gray-400 hover:underline w-fit'
                    onClick={() => setShowMore(prev => !prev)}
                >
                    <IoIosArrowDown
                        className={`transition-transform duration-300 ${
                            showMore ? 'rotate-180' : 'rotate-0'
                        }`}
                    />
                    <span>{showMore ? 'View Less' : 'View More'}</span>
                </div>
            </div>
        </div>
    )
}

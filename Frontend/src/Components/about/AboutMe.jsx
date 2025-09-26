import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";

export default function AboutMe() {
    const [showMore, setShowMore] = useState(false);

    return (
        <div id='about' className='w-full px-4 sm:px-6 my-10'>
            <div className='max-w-3xl mx-auto'>
                <h1 className='text-green-600 my-4 font-bold uppercase'>About Me</h1>

                <div className='flex flex-col gap-4'>
                    {/* Always visible part */}
                    <div>
                    I'm a developer who’s passionate about building for the web, with a strong focus on backend development using Django, PostgreSQL, and REST APIs. Over the past year, I’ve worked on and deployed several full-stack projects where I’ve been able to combine creativity with technical problem-solving. I also enjoy working with tools like Tailwind CSS, React, Celery, and Nginx, and I’m always curious to learn and experiment with new technologies that help me grow as a developer.
                    </div>

                    {/* Toggleable part */}
                    <div
                        className={`overflow-hidden transition-all duration-1000 ease-in-out ${
                            showMore ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                        }`}
                    >
                        <div className='flex flex-col gap-3 mt-2'>
                            <span>
                            My interests span across competitive programming (C/C++), system design, cloud computing, AI/ML —fields where logic, performance, and innovation intersect. I actively challenge myself through hands-on projects and by participating in competitive programming contests to sharpen my problem-solving abilities.
                            </span>

                            <span>
                            Beyond development, I’m driven by entrepreneurial ambition and aspire to build a meaningful startup that blends technology and impact. I’m continuously learning, pushing boundaries, and working toward my dream of contributing to world-class tech teams.
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

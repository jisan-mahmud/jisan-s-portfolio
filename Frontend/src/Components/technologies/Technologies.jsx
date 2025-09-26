import React from 'react';
import { FaPython, FaJs, FaReact, FaHtml5, FaCss3Alt, FaGitAlt, FaDocker } from 'react-icons/fa';
import { SiDjango, SiTailwindcss, SiPostgresql, SiNginx, SiJsonwebtokens} from 'react-icons/si';

export default function Technologies() {
    const technologies = [
        { name: 'Python', icon: <FaPython /> },
        { name: 'JavaScript', icon: <FaJs /> },
        { name: 'React', icon: <FaReact /> },
        { name: 'Django', icon: <SiDjango /> },
        { name: 'HTML5', icon: <FaHtml5 /> },
        { name: 'CSS3', icon: <FaCss3Alt /> },
        { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
        { name: 'PostgreSQL', icon: <SiPostgresql /> },
        { name: 'Git', icon: <FaGitAlt /> },
        { name: 'JWT', icon: <SiJsonwebtokens /> },
        { name: 'Nginx', icon: <SiNginx /> },
    ];

    return (
        <div id='technologies' className="py-10 px-4 sm:px-6 w-full">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-green-500 uppercase font-bold text-sm mb-6">
                    Technologies
                </h2>

                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
                    {technologies.map((technology) => (
                        <div
                            key={technology.name}
                            className="group aspect-square w-full border border-gray-700 rounded-xl p-1 flex flex-col items-center justify-center text-white hover:shadow-lg transition duration-300 ease-in-out"
                        >
                            <div className="text-4xl mb-2 transform transition-transform duration-500 group-hover:-translate-y-1">
                                {technology.icon}
                            </div>
                            <span className="font-medium text-sm text-center">{technology.name}</span>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

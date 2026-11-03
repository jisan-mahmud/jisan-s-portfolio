import React from 'react'
import IconButton from '../button/IconButton'
import { FaGithub, FaLinkedin, FaEnvelope, FaLink } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const iconMap = {
    github: <FaGithub />,
    linkedin: <FaLinkedin />,
    twitter: <FaSquareXTwitter />,
    x: <FaSquareXTwitter />,
    email: <FaEnvelope />,
    link: <FaLink />,
}

export default function SocialIcons({ socials = [] }) {
    return (
        <div className='flex gap-1.5 sm:gap-3 items-center flex-wrap'>
            {socials.map((social) => (
                <IconButton
                    key={social.id || social.label}
                    link={social.url}
                    title={social.label}
                    icon={iconMap[social.icon] || iconMap.link}
                />
            ))}
        </div>
    )
}

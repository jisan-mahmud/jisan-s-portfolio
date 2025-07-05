import React from 'react'
import IconButton from '../button/IconButton'
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function SocialIcons() {
    return (
        <div className='flex gap-1.5 sm:gap-3 items-center'>
            <IconButton link={'https://github.com/jisan-mahmud'} icon={<FaGithub />} />
            <IconButton link={'https://www.linkedin.com/in/jisan-mahmud203/'} icon={<FaLinkedin />} />
            <IconButton link={'https://x.com/jisan__mahmud'} icon={<FaSquareXTwitter />} />
        </div>
    )
}

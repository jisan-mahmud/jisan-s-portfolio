import React from 'react'
import LinkButton from '../button/LinkButton'
import SocialIcons from './SocialIcons';
import { TypeAnimation } from 'react-type-animation';

export default function Intro() {
    return (
        <div className='w-full px-4 sm:px-6 my-10'>
            <div className='max-w-3xl mx-auto flex justify-between gap-8 md:gap-14'>

                {/* Text Section */}
                <div className='flex-1 md:text-left'>
                    <TypeAnimation
                        sequence={[
                            "Hi, I'm Jisan Mahmud",
                            1000,
                        ]}
                        wrapper="h1"
                        cursor={true}
                        className="text-md md:text-2xl font-bold tracking-tight"
                        style={{ fontFamily: '"Quando", serif' }}
                    />

                    <p className='my-1 leading-tight sm:my-3 text-sm sm:text-lg text-gray-300'>
                        A self-taught fullstack developer, specializing in building scalable and efficient backend systems.
                    </p>
                    <span className='block my-2 text-sm sm:text-base'>
                        Mymensingh, Bangladesh
                    </span>
                    <div className='flex gap-2 sm:gap-4 my-2 sm:my-4 items-center'>
                        <div>
                            <LinkButton label={'Resume'} />
                        </div>

                        <div>
                            <SocialIcons />
                        </div>
                    </div>

                </div>

                {/* Image Section */}
                <div className='flex-1 flex my-auto justify-end'>
                    <img
                        src='images/jisan.jpg'
                        alt='Jisan Mahmud'
                        className='flex w-28 sm:w-32 md:w-40 h-28 sm:h-32 md:h-40 rounded-full shadow-lg object-cover'
                    />
                </div>
            </div>
        </div>
    )
}

import React from 'react'
import SocialIcons from '../other/SocialIcons';

export default function Footer() {
  const d = new Date();
  let year = d.getFullYear();

  return (
    <div className="py-5 px-4 sm:px-6 w-full">
      <div className="flex max-w-3xl justify-between justify-items-center mx-auto border-t pt-4 px-4 border-gray-700">
        <p className='tracking-widest'>© {year} Jisan Mahmud</p>
        <div>
          <SocialIcons />
        </div>
      </div>
    </div>
  )
}

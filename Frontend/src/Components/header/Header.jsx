import React from 'react';

export default function Header() {
  return (
    <header className="w-full px-4 sm:px-6">
      <div className="max-w-3xl mx-auto py-4 flex items-center justify-between gap-4 sm:gap-0">
        <h1
          className="text-lg sm:text-2xl text-green-600 font-bold" 
          style={{ fontFamily: '"Caveat", cursive' }}
        >
          Jisan Mahmud
        </h1>

        <nav>
          <ul className="flex flex-wrap justify-center gap-4 text-sm sm:text-base">
            <li className="hover:text-green-600 cursor-pointer">Projects</li>
            <li className="hover:text-green-600 cursor-pointer">About</li>
            <li className="hover:text-green-600 cursor-pointer">Contact</li>
            <li className="hover:text-green-600 cursor-pointer">Blog</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

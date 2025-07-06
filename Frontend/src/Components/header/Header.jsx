import React from 'react';
import { Link } from 'react-router';
import { HashLink } from 'react-router-hash-link';

export default function Header() {
  return (
    <header className="w-full px-4 sm:px-6">
      <div className="max-w-3xl mx-auto py-4 flex items-center justify-between gap-4 sm:gap-0">
        <h1
          className="text-lg sm:text-3xl text-green-600 font-bold"
          style={{ fontFamily: '"Caveat", cursive' }}
        >
          Jisan Mahmud
        </h1>

        <nav>
          <ul className="flex flex-wrap justify-center gap-4 text-sm sm:text-base">
            <HashLink smooth to="/#projects">
              <li className="hover:text-green-600 cursor-pointer">Projects</li>
            </HashLink>
            <HashLink smooth to="/#about">
              <li className="hover:text-green-600 cursor-pointer">About</li>
            </HashLink>
            <HashLink smooth to="/#contact">
              <li className="hover:text-green-600 cursor-pointer">Contact</li>
            </HashLink>
          </ul>
        </nav>
      </div>
    </header>
  );
}

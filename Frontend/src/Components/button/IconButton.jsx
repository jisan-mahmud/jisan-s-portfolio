import React from 'react'
import { Link } from 'react-router'

export default function IconButton({icon, className, link}) {
    return (
        <div>
            <Link
                to={link}
                className={`flex bg-transparent border border-gray-500 text-white p-1.5 sm:p-2.5 font-medium rounded-lg hover:bg-gray-800 transition ${className}`}
            >
                {icon}
            </Link>
        </div>
    )
}

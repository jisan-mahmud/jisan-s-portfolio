import React from 'react'
import { Link } from 'react-router'

export default function IconButton({icon}) {
    return (
        <div>
            <Link
                to='/resume'
                className='flex bg-transparent border border-gray-500 text-white p-2 sm:p-3 font-medium rounded-lg hover:bg-gray-800 transition'
            >
                {icon}
            </Link>
        </div>
    )
}

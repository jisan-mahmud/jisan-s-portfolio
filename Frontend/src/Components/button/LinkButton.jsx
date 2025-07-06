import React from 'react'
import { Link } from 'react-router'

export default function LinkButton({label, link}) {
    return (
        <div>
            <Link
                to={link}
                className='inline-block bg-green-600 text-white py-1 px-3 sm:py-2 sm:px-6 font-medium rounded hover:bg-green-700 transition'
            >
                {label}
            </Link>
        </div>
    )
}

import React from 'react'
import { Link } from 'react-router'

export default function IconButton({ icon, className, link, title }) {
    const classes = `flex bg-transparent border border-gray-500 text-white p-1.5 sm:p-2.5 font-medium rounded-lg hover:bg-gray-800 transition ${className || ''}`
    const isExternal = /^(https?:|mailto:|tel:)/i.test(link || '')

    if (isExternal) {
        return (
            <a href={link} target="_blank" rel="noreferrer" title={title} className={classes}>
                {icon}
            </a>
        )
    }

    return (
        <Link to={link} title={title} className={classes}>
            {icon}
        </Link>
    )
}

import React from 'react'
import LinkButton from '../button/LinkButton'

export default function Contact() {
    return (
        <div className="py-5 px-4 sm:px-6 w-full">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-green-500 uppercase font-bold text-sm mb-6">
                    Let's Connect
                </h2>

                <div className="flex flex-col justify-center items-center px-4 space-y-4">
                    <p className="text-lg text-white font-light">
                        Any questions, proposals, or collaborations? Feel free to reach out.
                    </p>
                    <LinkButton label={'Say Hello!'} />
                </div>


            </div>
        </div>
    )
}

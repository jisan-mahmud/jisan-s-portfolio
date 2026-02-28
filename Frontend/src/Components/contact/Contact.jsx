import React from 'react'
import LinkButton from '../button/LinkButton'
import { motion } from 'framer-motion'

export default function Contact() {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            id='contact' 
            className="py-5 px-4 sm:px-6 w-full"
        >
            <div className="max-w-3xl mx-auto">
                <motion.h2 
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-green-500 uppercase font-bold text-sm mb-6"
                >
                    Let's Connect
                </motion.h2>

                <div className="flex flex-col justify-center items-center px-4 space-y-4">
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-lg text-white font-light"
                    >
                        Any questions, proposals, or collaborations? Feel free to reach out.
                    </motion.p>
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.5, type: 'spring' }}
                    >
                        <LinkButton link={'mailto:jisan.mahmud203@gmail.com'} label={'Say Hello!'} />
                    </motion.div>
                </div>


            </div>
        </motion.div>
    )
}

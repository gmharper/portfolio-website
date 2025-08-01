
// IMPORTS
import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

function UnfurlHeading ({ icon, text_closed, text_open, width_closed, width_open }) {
    const [opened, setOpened] = useState(false)
    const [open, setOpen] = useState(false)

    let ref = useRef(null)
    let isInView = useInView(ref)

    let textArray = text_open.split("")

    return (
        <motion.div className='relative flex flex-row h-10 rounded-xs p-2 bg-stone-100'
            onMouseEnter={() => {
                setOpen(true) 
                setOpened(true)}}
            onMouseLeave={() => {
                setOpen(false)
            }}
            initial = {{ width: width_closed }}
            animate = {{ width: open ? width_open : width_closed }}
            transition = {{ duration: 0.3 }}
        >
        { open ? 
            <motion.p
                ref={ref}
                style={{ color: 'black' }}
                className='font-bold text-left'
                variants={{
                    visible: { opacity: open ? 1 : 0 }, hidden: {opacity: 0}
                }}
                transition={{ staggerChildren: 0.03 }}
                initial="hidden"
                whileInView="visible"
            >
                { textArray.map((char, index) => {
                    return <motion.span
                        key={char+index}
                        transition={{ duration: 0 }}
                        variants={{ 
                            visible: { opacity: open ? 1 : 0 }, hidden: { opacity: 0 }
                        }}
                    >
                        {char}
                    </motion.span >
                }) }
            </motion.p>
            :
            <p className='text-left font-bold text-black'>{text_closed}</p>    
        }

        <div className='flex-1' />

        { icon }

        { open ? <></> :
            <div className='z-15 absolute w-3 h-3 bg-sky-400 -top-1 -right-1 rounded-full' />
        }
        </motion.div>
    )
}

export default UnfurlHeading
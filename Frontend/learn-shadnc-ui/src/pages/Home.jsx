import React, { useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { Button } from '@/components/ui/button';

function Home() {

  const [isOpen, setIsOpen] = useState(true);

  const boxVariants = {
    hidden: {opacity: 0, y: -50},
    visible: {opacity: 1, y: 0}
  };

  return (
    <div>

      {/* Fades transition */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Hello, Framer Motion!
      </motion.div>

      {/* Variants Resualble State */}

      <motion.div
        variants={boxVariants}
        initial="hidden"
        animate="visible"
      >
        Hello, welcome to ICT.
      </motion.div>

      {/* Gusture */}

      <motion.button
        className='bg-cyan-300 rounded-2xl'
        whileHover={{scale: 1.2}}
        whileTap={{scale: 0.9}}
        onClick={() => setIsOpen(!isOpen)}
      >
        Hover & Click me
      </motion.button>

      <AnimatePresence>
        {
          isOpen && (
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0 }}
            >
              Hello From Modal
            </motion.div>
          )
        }
      </AnimatePresence>

      <div className='text-2xl text-blue-500'>
        Hello Tailwinds
      </div>
      <Button>Click Me</Button>
      <Button className="bg-red-500 hover:bg-red-700 text-white">Delete</Button>

    </div>
  )
}

export default Home
"use client";

import { motion } from "framer-motion";
import { Gift } from "lucide-react";

export const LoaderScreen = () => {
  return (
    <div className='z-50 fixed inset-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 flex items-center justify-center'>
      <div className='text-center'>
        {/* <motion.div
          className='inline-block' 
             animate={{
               scale: [1, 1.2, 1],
               rotate: [0, 360],
             }}
             transition={{
               duration: 2,
               ease: "easeInOut",
               times: [0, 0.5, 1],
               repeat: Infinity,
             }}
         >
           <Gift className='w-16 h-16 text-purple-600 dark:text-purple-400' />
         </motion.div>
*/}
        <motion.div
          className='inline-block text-[#9333ea]'
          animate={{
            scale: [1, 1.1, 1],
            color: ["#9333ea", "#db2777", "#9333ea"], // purple-600 to pink-600
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
        >
          <Gift className='w-16 h-16' />
        </motion.div>
        <motion.h1
          className='mt-4 text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          GatherGift
        </motion.h1>
        <motion.div
          className='mt-4 flex justify-center space-x-2'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className='w-3 h-3 rounded-full bg-purple-600 dark:bg-purple-400'
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

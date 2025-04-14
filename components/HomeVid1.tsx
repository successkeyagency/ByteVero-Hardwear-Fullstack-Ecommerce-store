'use client';

import React from 'react';
import { motion } from 'framer-motion';

const HomeVid1 = () => {
  return (
    <div className="relative mx-0 w-full h-[1000px] overflow-hidden">

      <video
        className="hidden md:block w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="https://videos.pexels.com/video-files/8005475/8005475-uhd_2560_1440_25fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <video
        className="block md:hidden w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="https://videos.pexels.com/video-files/8005844/8005844-uhd_1440_2560_25fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex flex-col items-center justify-center text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          className="text-4xl md:text-6xl font-bold leading-tight mb-6"
        >
          New Apple Headphones
        </motion.h1>

        <motion.a
          href="#learn-more"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
          className="px-8 py-3 bg-amber-500 text-black rounded-full text-lg font-semibold hover:bg-amber-600 transition duration-300"
        >
          Learn More
        </motion.a>
      </div>
    </div>
  );
};

export default HomeVid1;

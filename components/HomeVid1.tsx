"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const desktopVideos = [
  "https://videos.pexels.com/video-files/15996602/15996602-uhd_2560_1440_30fps.mp4",
  "https://videos.pexels.com/video-files/6789578/6789578-uhd_2560_1440_25fps.mp4",
  "https://videos.pexels.com/video-files/4480445/4480445-hd_1920_1080_30fps.mp4",
];

const mobileImage =
  "https://images.pexels.com/photos/8817849/pexels-photo-8817849.jpeg";

const HomeVid1 = () => {
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % desktopVideos.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = desktopVideos[index];
      videoRef.current.load();
      videoRef.current
        .play()
        .catch((err) => console.warn("Autoplay error:", err));
    }
  }, [index]);

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[700px] overflow-hidden">
      <video
        ref={videoRef}
        className="hidden md:block w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={desktopVideos[index]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <img
        src={mobileImage}
        alt="Mobile Hero"
        className="block md:hidden w-full h-full object-cover"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black/60 flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-white text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight mb-4 tracking-wide"
        >
          Build Like a Pro
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="text-white text-base sm:text-lg md:text-2xl mb-6 max-w-xl"
        >
          Discover top-rated tools and gear trusted by builders, makers, and
          pros worldwide.
        </motion.p>

        <motion.a
          href="/shop"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="px-6 sm:px-8 py-3 bg-yellow-400 text-black rounded-full text-base sm:text-lg font-semibold hover:bg-yellow-500 transition duration-300 shadow-lg"
        >
          Shop Now
        </motion.a>
      </div>
    </div>
  );
};

export default HomeVid1;

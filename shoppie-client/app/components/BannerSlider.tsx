"use client"
import React, { useEffect, useRef } from "react";
import Image from "next/image";

const BannerSlider: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const slideInterval = 3000; // Interval for automatic sliding

  useEffect(() => {
    const slides = carouselRef.current;
    if (!slides) return;

    let currentIndex = 0;
    const slideCount = slides.children.length;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slideCount;
      slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    }, slideInterval);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden w-full h-64">
      <div
        ref={carouselRef}
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
      >
        <div className="flex-shrink-0 w-full h-full">
          <Image
            alt="slider1"
            src="/images/slider1.webp"
            width={1000}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-shrink-0 w-full h-full">
          <Image
            alt="slider2"
            src="/images/slider2.webp"
            width={1000}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-shrink-0 w-full h-full">
          <Image
            alt="slider3"
            src="/images/slider3.webp"
            width={1000}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        type="button"
        className="absolute top-1/2 left-0 z-30 flex items-center justify-center w-10 h-10 -translate-y-1/2 bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-800/60"
        aria-label="Previous slide"
        onClick={() => {
          // Add functionality to go to previous slide
        }}
      >
        <svg className="w-4 h-4 text-white dark:text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
        </svg>
      </button>
      <button
        type="button"
        className="absolute top-1/2 right-0 z-30 flex items-center justify-center w-10 h-10 -translate-y-1/2 bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-800/60"
        aria-label="Next slide"
        onClick={() => {
          // Add functionality to go to next slide
        }}
      >
        <svg className="w-4 h-4 text-white dark:text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
        </svg>
      </button>
    </div>
  );
};

export default BannerSlider;

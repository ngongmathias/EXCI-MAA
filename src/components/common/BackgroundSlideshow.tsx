import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getBackgroundImages } from '../../services/backgroundImageService';

const BackgroundSlideshow = ({ 
  duration = 10000, // 10 seconds per slide
  className = '',
  children 
}) => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBackgroundImages();
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, duration);

    return () => clearInterval(interval);
  }, [images, duration]);

  const loadBackgroundImages = async () => {
    try {
      const data = await getBackgroundImages(true); // Get only active images
      if (data && data.length > 0) {
        setImages(data);
      } else {
        // Fallback to default gradient if no images
        setImages([]);
      }
    } catch (err) {
      console.error('Failed to load background images:', err);
      setError(err.message);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900" />
        {children}
      </div>
    );
  }

  // Show default gradient if no images or error
  if (error || images.length === 0) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900" />
        {children}
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Background Slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {images[currentIndex].link_url ? (
            <a
              href={images[currentIndex].link_url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 block cursor-pointer"
              aria-label={`Visit ${images[currentIndex].title || 'linked page'}`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat hover:scale-105 transition-transform duration-700"
                style={{
                  backgroundImage: `url(${images[currentIndex].image_url})`,
                }}
              />
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/40" />
              {/* Link indicator */}
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
            </a>
          ) : (
            <>
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${images[currentIndex].image_url})`,
                }}
              />
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/40" />
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-8 bg-white'
                : 'w-2 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows (Optional) */}
      {images.length > 1 && (
        <>
          <button
            onClick={() =>
              setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? images.length - 1 : prevIndex - 1
              )
            }
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() =>
              setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
            }
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Content Overlay */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

export default BackgroundSlideshow;

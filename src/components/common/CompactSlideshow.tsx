import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getBackgroundImages } from '../../services/backgroundImageService';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CompactSlideshowProps {
  className?: string;
  autoPlay?: boolean;
  duration?: number;
}

const CompactSlideshow: React.FC<CompactSlideshowProps> = ({ 
  className = '',
  autoPlay = true,
  duration = 5000
}) => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBackgroundImages();
  }, []);

  useEffect(() => {
    if (!autoPlay || images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, duration);

    return () => clearInterval(interval);
  }, [images, duration, autoPlay]);

  const loadBackgroundImages = async () => {
    try {
      const data = await getBackgroundImages(true); // Get only active images
      if (data && data.length > 0) {
        setImages(data);
      } else {
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

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleSlideClick = (image) => {
    if (image.link_url) {
      if (image.link_url.startsWith('http://') || image.link_url.startsWith('https://')) {
        window.open(image.link_url, '_blank', 'noopener,noreferrer');
      } else {
        window.open(`https://${image.link_url}`, '_blank', 'noopener,noreferrer');
      }
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className={`w-full max-w-sm mx-auto h-32 bg-gray-200 rounded-lg animate-pulse ${className}`} />
    );
  }

  // Don't show component if no images or error
  if (error || images.length === 0) {
    return null;
  }

  return (
    <div className={`relative w-full max-w-2xl mx-auto h-[30vh] overflow-hidden rounded-lg shadow-lg ${className}`}>
      {/* Slideshow Container */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 cursor-pointer"
            onClick={() => handleSlideClick(images[currentIndex])}
          >
            <img
              src={images[currentIndex].image_url}
              alt={images[currentIndex].title || 'Slide'}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            
            {/* Overlay for better visibility of controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            
            {/* Title overlay if available */}
            {images[currentIndex].title && (
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-white text-xs font-medium drop-shadow-lg truncate">
                  {images[currentIndex].title}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="absolute left-1 top-1/2 transform -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full transition-all duration-200"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full transition-all duration-200"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Progress Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 z-10 flex space-x-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'w-4 bg-white'
                    : 'w-1.5 bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Click indicator if link exists */}
        {images[currentIndex]?.link_url && (
          <div className="absolute top-1 right-1 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            <span className="text-[10px]">🔗</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompactSlideshow;
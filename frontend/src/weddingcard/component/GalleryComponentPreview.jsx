import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWeddingCard } from '../../customhooks/WeddingCardContext';

function GalleryComponentPreview() {
    const { design } = useWeddingCard();
    const [currentIndex, setCurrentIndex] = useState(0);

    // Placeholder images for preview since no dynamic gallery exists yet
    const placeholderImages = [
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ];

    // Auto-slide effect that resets its timer whenever currentIndex changes (e.g. via manual click)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % placeholderImages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [placeholderImages.length, currentIndex]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % placeholderImages.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + placeholderImages.length) % placeholderImages.length);
    };

    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="main-card flex flex-col justify-center items-center py-16 px-6"
            style={{ color: design?.fontColor || "#000000" }}
        >
            <h2 className="text-4xl font-bold mb-8 font-Tangerine text-center">
                Galeri
            </h2>
            <div className="relative w-full max-w-sm h-72 md:h-80 overflow-hidden rounded-2xl shadow-xl border border-gray-100/30 group">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentIndex}
                        src={placeholderImages[currentIndex]}
                        alt={`Gallery Preview ${currentIndex + 1}`}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 w-full h-full object-cover shadow-inner"
                    />
                </AnimatePresence>

                {/* Arrow Navigation */}
                <button
                    onClick={handlePrev}
                    aria-label="Previous image"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button
                    onClick={handleNext}
                    aria-label="Next image"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>

                {/* Navigation Dots */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                    {placeholderImages.map((_, idx) => (
                        <button
                            key={idx}
                            aria-label={`Go to slide ${idx + 1}`}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-2 w-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white scale-125' : 'bg-gray-300 opacity-60 hover:opacity-100 hover:bg-white'}`}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default GalleryComponentPreview;
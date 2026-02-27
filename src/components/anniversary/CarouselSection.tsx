import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const carouselImages = [
    { id: 1, src: "https://assets.cdn.filesafe.space/dWngLoFGbdh0QqxXOj8c/media/69a1a2ce524b7176e252ed2f.jpg", label: "Slide 1" },
    { id: 2, src: "https://assets.cdn.filesafe.space/dWngLoFGbdh0QqxXOj8c/media/69a1a2ce753f157022d71fbd.jpg", label: "Slide 2" },
    { id: 3, src: "https://assets.cdn.filesafe.space/dWngLoFGbdh0QqxXOj8c/media/69a1a2ce8844f55fe9979bc8.jpg", label: "Slide 3" },
    { id: 4, src: "https://assets.cdn.filesafe.space/dWngLoFGbdh0QqxXOj8c/media/69a1a2ce9a0c182f7678310f.png", label: "Slide 4" },
    { id: 5, src: "https://assets.cdn.filesafe.space/dWngLoFGbdh0QqxXOj8c/media/69a1a2ce524b717eee52ed31.jpg", label: "Slide 5" },
    { id: 6, src: "https://assets.cdn.filesafe.space/dWngLoFGbdh0QqxXOj8c/media/69a1a2cec4df65de2b93c2ba.jpg", label: "Slide 6" },
    { id: 7, src: "https://assets.cdn.filesafe.space/dWngLoFGbdh0QqxXOj8c/media/69a1a2ce2f17be64b600b100.jpg", label: "Slide 7" },
    { id: 8, src: "https://assets.cdn.filesafe.space/dWngLoFGbdh0QqxXOj8c/media/69a1a2ce81e3ee00dc2c491f.jpg", label: "Slide 8" },
    { id: 9, src: "https://assets.cdn.filesafe.space/dWngLoFGbdh0QqxXOj8c/media/69a1a2cedc26f5c349343b85.jpg", label: "Slide 9" },
    { id: 10, src: "https://assets.cdn.filesafe.space/dWngLoFGbdh0QqxXOj8c/media/69a1a2ce2f17bef37900b101.jpg", label: "Slide 10" },
    { id: 11, src: "https://assets.cdn.filesafe.space/dWngLoFGbdh0QqxXOj8c/media/69a1a2ce81e3ee31c62c4920.jpg", label: "Slide 11" },
];

const CarouselSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000); // Auto-advance every 5 seconds

        return () => clearInterval(timer);
    }, []);

    return (
        <section ref={ref} className="py-16 lg:py-20 bg-muted relative overflow-hidden border-b border-border/50">
            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="h-px w-12 bg-crc-gold" />
                        <span className="text-crc-gold font-medium uppercase tracking-widest text-sm">
                            LinkedIn Featured Post
                        </span>
                        <div className="h-px w-12 bg-crc-gold" />
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        <span className="text-crc-blue">10 Years</span> of Climate Resilience
                    </h2>

                    <p className="text-muted-foreground max-w-2xl mx-auto text-base mb-8">
                        Check out CRC's carousel post celebrating a decade of climate resilience leadership, impact, and community-driven solutions.
                    </p>

                    <Button
                        size="lg"
                        className="bg-crc-blue hover:bg-crc-blue-dark text-white group"
                        asChild
                    >
                        <a href="https://www.linkedin.com/posts/climateresilienceconsulting_climateresilience-biodiversity-resilientmidwest-activity-7422311229047644162-B_jJ?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC-6aRUBvR_6xR3RqtraHaMj8t5AWZ9Gnuo" target="_blank" rel="noopener noreferrer">
                            View the Carousel Post
                            <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </Button>
                </motion.div>

                {/* Carousel */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full"
                >
                    <div className="relative aspect-[4/5] md:aspect-[4/4] lg:aspect-[4/3] max-w-3xl mx-auto rounded-xl overflow-hidden shadow-crc-lg border border-border bg-white group">
                        {/* Images */}
                        {carouselImages.map((image, index) => (
                            <div
                                key={image.id}
                                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center p-2 bg-white ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                                    }`}
                            >
                                <img
                                    src={image.src}
                                    alt={image.label}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                        ))}

                        {/* Navigation Arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        {/* Indicators */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 flex-wrap justify-center px-4 max-w-full">
                            {carouselImages.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "w-6 bg-crc-gold shadow-sm" : "w-2 bg-gray-400/80 hover:bg-gray-600"
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CarouselSection;

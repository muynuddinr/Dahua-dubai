"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";

export default function Banner() {
    const [isLoaded, setIsLoaded] = useState(false);

    const bannerData = {
        image: "/images/main-banner.png",
        title: "Leading Dahua Security in Dubai",
        titleHighlight: "Dahua",
        highlight: "SIRA Approved & Trusted Partner",
        description:
            "As part of Digital Link Tech, we provide enterprise-grade security and surveillance solutions. We specialize in Dahua's comprehensive range of cameras, DVRs, and NVRs, delivering cost-effective systems tailored for projects across the UAE.",
        cta: "View Our Dahua Solutions",
        ctaLink: "/products",
    };


    // Animation variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
            },
        },
    };

    const underlineVariants: Variants = {
        hidden: {
            width: 0,
            opacity: 0
        },
        visible: {
            width: "30%",
            opacity: 1,
            transition: {
                delay: 0.8,
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    const imageVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8
            }
        }
    };

    return (
        <div className="w-full relative banner">
            {/* Banner Container - Full screen height */}
            <div className="relative w-full h-screen mt-4 min-h-[600px] overflow-hidden">
                <div className="absolute inset-0">
                    {/* Single Banner Image */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={imageVariants}
                        className="w-full h-full"
                    >
                        <img
                            src={bannerData.image}
                            alt="Dahua Security Solutions in Dubai"
                            className="w-full h-full object-cover"
                            onLoad={() => setIsLoaded(true)}
                            onError={() => setIsLoaded(true)} // Fallback in case image fails to load
                        />
                    </motion.div>

                    {/* Dark overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/40" />

                    {/* Banner Content - Left aligned */}
                    <div className="absolute inset-0 flex items-center">
                        <motion.div
                            initial="hidden"
                            animate={isLoaded ? "visible" : "visible"} // Changed to always show content
                            variants={containerVariants}
                            className="text-white px-6 md:px-12 lg:px-16 max-w-4xl lg:max-w-5xl"
                        >
                            {/* Highlight Text */}
                            <motion.p
                                variants={itemVariants}
                                className="text-lg md:text-xl font-semibold text-red-500 mb-2"
                            >
                                {bannerData.highlight}
                            </motion.p>

                            {/* Title with Animated Underline */}
                            <div className="relative inline-block mb-6">
                                <motion.h1
                                    variants={itemVariants}
                                    className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
                                >
                                    Reliable <span className="text-red-600">Dahua</span> Security Expertise in Dubai
                                </motion.h1>
                                <motion.div
                                    variants={underlineVariants}
                                    className="absolute bottom-0 left-0 h-1 bg-red-500 rounded-full"
                                />
                            </div>

                            {/* Description */}
                            <motion.p
                                variants={itemVariants}
                                className="text-lg md:text-xl mb-8 leading-relaxed max-w-3xl"
                            >
                                {bannerData.description}
                            </motion.p>

                            {/* Call to Action Button */}

                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Custom Styles */}
            <style jsx global>{`
                .banner p {
                    font-size: 18px;
                    line-height: 1.75;
                    margin: 0;
                    max-width: none;
                    display: block;
                    overflow: visible;
                    text-overflow: clip;
                    max-height: none;
                }
                
                /* Ensure image covers the container properly */
                .banner img {
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                }
            `}</style>
        </div>
    );
}
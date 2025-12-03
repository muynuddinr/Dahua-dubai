'use client';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Variants } from 'framer-motion';
import Link from 'next/link';
import ProductEnquiryModal from '@/app/components/ProductEnquiryModal';
import {
    FaHome,
    FaChevronRight,
    FaBoxes,
    FaBox,
    FaFolder,
    FaArrowLeft,
    FaCheckCircle,
    FaCalendar,
    FaLink,
    FaChevronLeft,
    FaChevronRight as FaChevronRightIcon,
    FaTimes,
} from 'react-icons/fa';

interface NavbarCategory {
    _id: string;
    name: string;
    slug: string;
    href: string;
}

interface Category {
    _id: string;
    name: string;
    slug: string;
    navbarCategoryId: NavbarCategory;
}

interface SubCategory {
    _id: string;
    name: string;
    slug: string;
    categoryId: Category;
    navbarCategoryId: NavbarCategory;
}

interface Product {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    keyFeatures: string[];
    images: {
        url: string;
        publicId: string;
    }[];
    subcategoryId: SubCategory;
    categoryId: Category;
    navbarCategoryId: NavbarCategory;
    isActive: boolean;
    order: number;
    createdAt: string;
    updatedAt: string;
}

interface ProductDetailPageClientProps {
    product: Product;
}

// Animation variants
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 0.6
        }
    }
};

const contentSlideIn: Variants = {
    hidden: {
        opacity: 0,
        x: -50
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
            duration: 0.8
        }
    }
};

export default function ProductDetailPageClient({
    product,
}: ProductDetailPageClientProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [showImageModal, setShowImageModal] = useState(false);
    const [showEnquiryModal, setShowEnquiryModal] = useState(false);
    const [heroRef, heroInView] = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    const category = product.categoryId as Category;
    const subCategory = product.subcategoryId as SubCategory;
    const navbarCategory = product.navbarCategoryId as NavbarCategory;

    const nextImage = () => {
        if (product && product.images) {
            setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
        }
    };

    const prevImage = () => {
        if (product && product.images) {
            setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
        }
    };

    // Fallback background images
    const backgroundImages = [
        "/images/Product2.png",
    ];



    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative h-screen overflow-hidden">
                {/* Image Background */}
                <div className="absolute inset-0 transition-opacity duration-300">
                    <img
                        src={backgroundImages[0]}
                        alt={subCategory.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/10" />
                </div>

                {/* Hero Content */}
                <div className="relative h-full flex items-center px-6 lg:px-12 z-10">
                    <motion.div
                        ref={heroRef}
                        initial="hidden"
                        animate={heroInView ? "visible" : "hidden"}
                        variants={contentSlideIn}
                        className="max-w-2xl text-left"
                    >
                        <motion.h1
                            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            {product.name}
                        </motion.h1>

                        {product.description && (
                            <motion.p
                                className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mb-8"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            >
                                {product.description}
                            </motion.p>
                        )}
                    </motion.div>
                </div>

                {/* Scroll Indicator - REMOVED */}
            </div>

            {/* Content Section */}
            <div id="product-details" className="relative bg-gradient-to-br from-slate-50 to-slate-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
                    {/* Breadcrumb Navigation */}
                    <motion.nav
                        className="inline-flex items-center gap-x-1 sm:gap-x-1.5 text-[10px] sm:text-xs bg-white/80 backdrop-blur-sm rounded-full px-2.5 sm:px-3 py-1.5 mb-8 sm:mb-10 md:mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <Link
                            href="/"
                            className="text-slate-600 hover:text-slate-900 transition-colors flex items-center group flex-shrink-0"
                        >
                            <FaHome className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover:scale-110 transition-transform" />
                        </Link>

                        <FaChevronRight className="w-2 h-2 text-slate-400 flex-shrink-0" />
                        <a
                            href={navbarCategory.href}
                            className="text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            {navbarCategory.name}
                        </a>
                        <FaChevronRight className="w-2 h-2 text-slate-400 flex-shrink-0" />
                        <a
                            href={`/product/${category.slug}`}
                            className="text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            {category.name}
                        </a>
                        <FaChevronRight className="w-2 h-2 text-slate-400 flex-shrink-0" />
                        <a
                            href={`/product/${category.slug}/${subCategory.slug}`}
                            className="text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            {subCategory.name}
                        </a>
                        <FaChevronRight className="w-2 h-2 text-slate-400 flex-shrink-0" />
                        <span className="text-red-500 font-semibold">{product.name}</span>
                    </motion.nav>

                    {/* Product Details Section */}
                    <motion.section
                        className="mb-16"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={containerVariants}
                    >
                        <div className="grid lg:grid-cols-2 gap-8 items-start">
                            {/* Left - Image Gallery */}
                            <motion.div variants={itemVariants} className="sticky top-20">
                                {/* Main Image Display */}
                                <div
                                    className="relative bg-white rounded-2xl shadow-sm p-8 mb-3 cursor-pointer group"
                                    onClick={() => setShowImageModal(true)}
                                >
                                    <div className="aspect-[16/10] flex items-center justify-center">
                                        {product.images?.length > 0 ? (
                                            <>
                                                <img
                                                    src={product.images[selectedImageIndex].url}
                                                    alt={product.name}
                                                    className="max-w-full max-h-full object-contain group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                                                />
                                                {/* Zoom Indicator */}
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 flex items-center justify-center rounded-2xl">
                                                    <div className="bg-white rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-300 shadow-lg">
                                                        <div className="flex items-center gap-2">
                                                            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                            </svg>
                                                            <span className="text-sm font-medium text-slate-600">Click to enlarge</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <FaBox className="w-20 h-20 text-slate-200" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Image Counter Badge */}
                                    {product.images?.length > 1 && (
                                        <div className="absolute top-4 right-4">
                                            <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
                                                {selectedImageIndex + 1} / {product.images.length}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Thumbnail Gallery */}
                                {product.images?.length > 1 && (
                                    <div className="grid grid-cols-4 gap-2">
                                        {product.images.map((img, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedImageIndex(index)}
                                                className={`relative aspect-square rounded-lg overflow-hidden bg-white p-2 border transition-all duration-200 ${selectedImageIndex === index
                                                    ? 'border-slate-300 shadow-sm'
                                                    : 'border-slate-200 hover:border-slate-300'
                                                    }`}
                                            >
                                                <img
                                                    src={img.url}
                                                    alt={`${product.name} view ${index + 1}`}
                                                    className="w-full h-full object-contain"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </motion.div>

                            {/* Right - Product Information */}
                            <motion.div variants={itemVariants} className="space-y-6">
                                {/* Product Header */}
                                <div>
                                    <h1 className="text-3xl font-bold text-slate-900 mb-3">
                                        {product.name}
                                    </h1>
                                    <div className="inline-block">
                                        <h2 className="text-base font-semibold text-slate-700 pb-2 border-b-2 border-red-500">
                                            Overview
                                        </h2>
                                    </div>
                                </div>

                                {/* Product Description */}
                                <div>
                                    <p className="text-slate-700 text-base leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>

                                {/* Specifications List */}
                                {product.keyFeatures?.length > 0 && (
                                    <div className="space-y-3">
                                        {product.keyFeatures.map((feature, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 + idx * 0.05 }}
                                                className="flex items-start gap-3"
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                                                <span className="text-slate-700 text-base leading-relaxed">
                                                    {feature}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}

                                {/* Call-to-Action */}
                                <div className="pt-2 flex justify-center">
                                    <button
                                        onClick={() => setShowEnquiryModal(true)}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 border border-red-600 hover:bg-red-700 text-black hover:text-white text-xs font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                                    >
                                        Request Information
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </motion.section>
                </div>
            </div>

            {product && (
                <ProductEnquiryModal
                    isOpen={showEnquiryModal}
                    onClose={() => setShowEnquiryModal(false)}
                    product={{
                        _id: product._id,
                        name: product.name,
                        slug: product.slug,
                        images: product.images,
                    }}
                />
            )}

            {/* Full Screen Image Modal */}
            {showImageModal && product.images && product.images.length > 0 && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowImageModal(false)}
                        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className="relative max-w-6xl w-full">
                            {/* Close Button */}
                            <button
                                onClick={() => setShowImageModal(false)}
                                className="absolute -top-12 right-0 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <FaTimes className="w-6 h-6 text-white" />
                            </button>

                            {/* Image */}
                            <div className="relative">
                                <img
                                    src={product.images[selectedImageIndex].url}
                                    alt={product.name}
                                    className="w-full max-h-[80vh] object-contain rounded-2xl"
                                />

                                {/* Navigation Arrows */}
                                {product.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                prevImage();
                                            }}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                                        >
                                            <FaChevronLeft className="w-6 h-6 text-white" />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                nextImage();
                                            }}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                                        >
                                            <FaChevronRightIcon className="w-6 h-6 text-white" />
                                        </button>
                                    </>
                                )}

                                {/* Image Counter */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                                    <span className="px-6 py-3 bg-black/70 backdrop-blur-sm text-white rounded-full text-sm font-semibold">
                                        {selectedImageIndex + 1} / {product.images.length}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </div>
    );
}
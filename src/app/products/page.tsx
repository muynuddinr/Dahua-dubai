import { Metadata } from "next";
import axios from 'axios';
import { ProductsClient } from './ProductsClient';

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
  description?: string;
  image?: string;
  navbarCategoryId: NavbarCategory;
  isActive: boolean;
  order: number;
  createdAt: string;
}

async function getCategories(): Promise<Category[]> {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/category`, {
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    
    if (response.data.success) {
      // Only show active categories, sorted by order
      return response.data.data
        .filter((cat: Category) => cat.isActive)
        .sort((a: Category, b: Category) => a.order - b.order);
    }
    return [];
  } catch (err) {
    console.error('Error fetching categories:', err);
    return [];
  }
}

async function getNavbarCategories(): Promise<NavbarCategory[]> {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/navbar-category`, {
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    
    if (response.data.success) {
      return response.data.data;
    }
    return [];
  } catch (err) {
    console.error('Error fetching navbar categories:', err);
    return [];
  }
}

export const metadata: Metadata = {
  title: 'Security Products Dubai - CCTV Cameras & Surveillance Equipment',
  description: 'Explore our comprehensive range of security products in Dubai including CCTV cameras, DVR/NVR systems, access control, and surveillance equipment from leading brands.',
  keywords: 'security products Dubai,Dahua authorized dealer UAE, Dahua, Dahua Dubai, Dahua Technology, CCTV, Security Systems, Surveillance Solutions, IP Cameras, Video Surveillance, Access Control, NVR, Security Equipment, Home Security, Commercial Security, Dahua Dealer, Dahua Distributor, Dahua Partner, Dahua Authorized Reseller, Dahua CCTV, Dahua Security Cameras, Dahua Surveillance, Dahua Solutions, Dahua UAE, Dahua Middle East. CCTV cameras, surveillance equipment, DVR systems, NVR systems, access control, security cameras UAE, video surveillance, security systems',
  openGraph: {
    title: 'Security Products Dubai - CCTV Cameras & Surveillance Equipment',
    description: 'Explore our comprehensive range of security products in Dubai including CCTV cameras, DVR/NVR systems, access control, and surveillance equipment from leading brands.',
    type: 'website',
    url: 'https://dahua-dubai.com/products',
    images: [{
      url: '/images/dahualogo-removebg-preview0.png',
      width: 1200,
      height: 630,
      alt: 'Security Products - CCTV Cameras & Surveillance Equipment',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Security Products Dubai - CCTV Cameras & Surveillance Equipment',
    description: 'Explore our comprehensive range of security products in Dubai including CCTV cameras, DVR/NVR systems, access control, and surveillance equipment.',
    images: ['/images/dahualogo-removebg-preview0.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://dahua-dubai.com/products',
  },
};

export default async function ProductsPage() {
  const [categories, navbarCategories] = await Promise.all([
    getCategories(),
    getNavbarCategories(),
  ]);

  return (
    <ProductsClient 
      initialCategories={categories} 
      navbarCategories={navbarCategories} 
    />
  );
}
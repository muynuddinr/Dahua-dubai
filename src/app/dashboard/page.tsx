'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaChartBar, FaBox, FaUsers, FaEnvelope, FaArrowUp, FaArrowDown, FaCircle, FaLayerGroup, FaSitemap, FaShoppingBag, FaQuestionCircle, FaMailBulk } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DashboardStats {
  navbarCategories: number;
  categories: number;
  subCategories: number;
  products: number;
  productEnquiries: number;
  contactEnquiries: number;
  totalEnquiries: number;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    navbarCategories: 0,
    categories: 0,
    subCategories: 0,
    products: 0,
    productEnquiries: 0,
    contactEnquiries: 0,
    totalEnquiries: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      
      // Fetch all data in parallel
      const [navbarCatRes, categoryRes, subCategoryRes, productRes, enquiryRes] = await Promise.all([
        axios.get('/api/navbar-category'),
        axios.get('/api/category'),
        axios.get('/api/sub-category'),
        axios.get('/api/product'),
        axios.get('/api/contact'),
      ]);

      // Extract data from API responses (they return {success: true, data: []})
      const navbarData = navbarCatRes.data?.data || navbarCatRes.data || [];
      const categoryData = categoryRes.data?.data || categoryRes.data || [];
      const subCategoryData = subCategoryRes.data?.data || subCategoryRes.data || [];
      const productData = productRes.data?.data || productRes.data || [];
      const enquiryData = enquiryRes.data?.data || enquiryRes.data || [];

      // Filter enquiries by type
      const productEnquiries = enquiryData.filter((enq: any) => enq.productName && enq.productName.trim() !== '');
      const contactEnquiries = enquiryData.filter((enq: any) => !enq.productName || enq.productName.trim() === '');

      setStats({
        navbarCategories: Array.isArray(navbarData) ? navbarData.length : 0,
        categories: Array.isArray(categoryData) ? categoryData.length : 0,
        subCategories: Array.isArray(subCategoryData) ? subCategoryData.length : 0,
        products: Array.isArray(productData) ? productData.length : 0,
        productEnquiries: productEnquiries.length || 0,
        contactEnquiries: contactEnquiries.length || 0,
        totalEnquiries: Array.isArray(enquiryData) ? enquiryData.length : 0,
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      // Set default values on error
      setStats({
        navbarCategories: 0,
        categories: 0,
        subCategories: 0,
        products: 0,
        productEnquiries: 0,
        contactEnquiries: 0,
        totalEnquiries: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      icon: FaSitemap,
      label: 'Navbar Categories',
      value: stats.navbarCategories,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-400',
    },
    {
      icon: FaLayerGroup,
      label: 'Categories',
      value: stats.categories,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      textColor: 'text-purple-400',
    },
    {
      icon: FaChartBar,
      label: 'Sub Categories',
      value: stats.subCategories,
      color: 'from-emerald-500 to-green-500',
      bgColor: 'bg-emerald-500/10',
      textColor: 'text-emerald-400',
    },
    {
      icon: FaShoppingBag,
      label: 'Products',
      value: stats.products,
      color: 'from-orange-500 to-amber-500',
      bgColor: 'bg-orange-500/10',
      textColor: 'text-orange-400',
    },
    {
      icon: FaQuestionCircle,
      label: 'Product Enquiries',
      value: stats.productEnquiries,
      color: 'from-red-500 to-rose-500',
      bgColor: 'bg-red-500/10',
      textColor: 'text-red-400',
    },
    {
      icon: FaMailBulk,
      label: 'Contact Enquiries',
      value: stats.contactEnquiries,
      color: 'from-cyan-500 to-teal-500',
      bgColor: 'bg-cyan-500/10',
      textColor: 'text-cyan-400',
    },
  ];

  const pieChartData = [
    { name: 'Navbar Categories', value: stats.navbarCategories },
    { name: 'Categories', value: stats.categories },
    { name: 'Sub Categories', value: stats.subCategories },
    { name: 'Products', value: stats.products },
    { name: 'Product Enquiries', value: stats.productEnquiries },
    { name: 'Contact Enquiries', value: stats.contactEnquiries },
  ];

  const barChartData = [
    { name: 'Navbar Cat', value: stats.navbarCategories, fill: '#3b82f6' },
    { name: 'Categories', value: stats.categories, fill: '#8b5cf6' },
    { name: 'Sub Cat', value: stats.subCategories, fill: '#10b981' },
    { name: 'Products', value: stats.products, fill: '#f59e0b' },
    { name: 'Prod Enq', value: stats.productEnquiries, fill: '#ef4444' },
    { name: 'Contact Enq', value: stats.contactEnquiries, fill: '#06b6d4' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-slate-300 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p className="text-slate-400 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-8">
      {/* Header with Gradient */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-slate-700/50"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
            Dashboard Overview
          </h1>
          <p className="text-slate-400">Welcome back! Here's what's happening with your store today.</p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          
          return (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative overflow-hidden bg-slate-900 rounded-2xl border border-slate-800 p-6 hover:border-slate-700 transition-all duration-300"
            >
              {/* Gradient Background Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.bgColor} p-3 rounded-xl`}>
                    <Icon className={`${stat.textColor} w-6 h-6`} />
                  </div>
                </div>
                <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
                <p className="text-4xl font-bold text-white tracking-tight">{stat.value}</p>
              </div>
              
              {/* Shine Effect */}
              <div className="absolute inset-0 -top-[100%] bg-gradient-to-b from-white/20 to-transparent group-hover:top-[100%] transition-all duration-700"></div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-900 rounded-2xl border border-slate-800 p-6"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Data Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-900 rounded-2xl border border-slate-800 p-6"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Data Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 border border-blue-400/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-2">Total Content Items</p>
              <p className="text-4xl font-bold text-white">
                {stats.navbarCategories + stats.categories + stats.subCategories + stats.products}
              </p>
            </div>
            <FaBox className="w-16 h-16 text-white/20" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 border border-purple-400/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm mb-2">Total Enquiries</p>
              <p className="text-4xl font-bold text-white">{stats.totalEnquiries}</p>
            </div>
            <FaEnvelope className="w-16 h-16 text-white/20" />
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <a 
          href="/dashboard/products" 
          className="group p-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 border border-blue-400/20 block"
        >
          <FaShoppingBag className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-white font-bold text-lg mb-1">Manage Products</h3>
          <p className="text-blue-100 text-sm">View and edit products</p>
        </a>
        
        <a 
          href="/dashboard/product-enquiry" 
          className="group p-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 border border-purple-400/20 block"
        >
          <FaQuestionCircle className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-white font-bold text-lg mb-1">Product Enquiries</h3>
          <p className="text-purple-100 text-sm">Check product enquiries</p>
        </a>
        
        <a 
          href="/dashboard/contact-enquiry" 
          className="group p-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 border border-orange-400/20 block"
        >
          <FaMailBulk className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-white font-bold text-lg mb-1">Contact Enquiries</h3>
          <p className="text-orange-100 text-sm">View contact messages</p>
        </a>
      </motion.div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  FaSearch,
  FaPhone,
  FaEnvelope,
  FaTrash,
  FaEye,
  FaFilter,
  FaBuilding,
  FaCalendar,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaReply,
  FaUser,
  FaBox,
  FaMailBulk,
} from 'react-icons/fa';

interface Product {
  _id: string;
  name: string;
  slug: string;
  images?: { url: string; publicId: string }[];
}

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  companyName?: string;
  subject?: string;
  message?: string;
  productName?: string;
  productSlug?: string;
  productId?: Product;
  enquiryType: 'general' | 'product';
  status: 'new' | 'read' | 'responded' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export default function ContactEnquiryPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  useEffect(() => {
    filterEnquiries();
  }, [enquiries, searchQuery, statusFilter]);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/contact');
      // Filter only GENERAL enquiries (those without productName)
      const generalEnquiries = response.data.filter((enq: Enquiry) => !enq.productName || enq.productName.trim() === '');
      setEnquiries(generalEnquiries);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterEnquiries = () => {
    let filtered = [...enquiries];

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((enq) => enq.status === statusFilter);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (enq) =>
          enq.name.toLowerCase().includes(query) ||
          enq.email.toLowerCase().includes(query) ||
          enq.mobile.includes(query) ||
          (enq.companyName && enq.companyName.toLowerCase().includes(query)) ||
          (enq.subject && enq.subject.toLowerCase().includes(query))
      );
    }

    setFilteredEnquiries(filtered);
  };

  const updateStatus = async (id: string, status: 'new' | 'read' | 'responded' | 'closed') => {
    try {
      await axios.put(`/api/contact?id=${id}`, { status });
      fetchEnquiries();
      if (selectedEnquiry && selectedEnquiry._id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteEnquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;

    try {
      await axios.delete(`/api/contact?id=${id}`);
      fetchEnquiries();
      if (selectedEnquiry && selectedEnquiry._id === id) {
        setShowDetailModal(false);
        setSelectedEnquiry(null);
      }
    } catch (error) {
      console.error('Error deleting enquiry:', error);
    }
  };

  const viewDetails = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry);
    setShowDetailModal(true);
    if (enquiry.status === 'new') {
      updateStatus(enquiry._id, 'read');
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      new: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', icon: FaClock },
      read: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30', icon: FaEye },
      responded: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', icon: FaReply },
      closed: { bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-500/30', icon: FaCheckCircle },
    };
    const badge = badges[status as keyof typeof badges] || badges.new;
    const Icon = badge.icon;
    return (
      <span className={`px-3 py-1 ${badge.bg} ${badge.text} border ${badge.border} rounded-lg text-xs font-semibold flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {status.toUpperCase()}
      </span>
    );
  };

  const stats = {
    total: enquiries.length,
    new: enquiries.filter((e) => e.status === 'new').length,
    read: enquiries.filter((e) => e.status === 'read').length,
    responded: enquiries.filter((e) => e.status === 'responded').length,
    closed: enquiries.filter((e) => e.status === 'closed').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-slate-300 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p className="text-slate-600 text-lg">Loading enquiries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900">General Contact Enquiries</h1>
        <p className="text-slate-600 mt-2">Manage customer contact form submissions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
          <div className="text-3xl font-bold text-slate-900 mb-1">{stats.total}</div>
          <div className="text-sm text-slate-600">Total</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center shadow-sm">
          <div className="text-3xl font-bold text-blue-600 mb-1">{stats.new}</div>
          <div className="text-sm text-blue-600">New</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center shadow-sm">
          <div className="text-3xl font-bold text-purple-600 mb-1">{stats.read}</div>
          <div className="text-sm text-purple-600">Read</div>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center shadow-sm">
          <div className="text-3xl font-bold text-emerald-600 mb-1">{stats.responded}</div>
          <div className="text-sm text-emerald-600">Responded</div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center shadow-sm">
          <div className="text-3xl font-bold text-slate-600 mb-1">{stats.closed}</div>
          <div className="text-sm text-slate-600">Closed</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, phone, company, subject..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="responded">Responded</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Enquiries List */}
      <div className="space-y-4">
        {filteredEnquiries.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm">
            <FaEnvelope className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 text-lg">No enquiries found</p>
          </div>
        ) : (
          filteredEnquiries.map((enquiry) => (
            <motion.div
              key={enquiry._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-xl font-bold text-slate-900">{enquiry.name}</h3>
                        {getStatusBadge(enquiry.status)}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                        <span className="flex items-center gap-2">
                          <FaEnvelope className="w-4 h-4" />
                          {enquiry.email}
                        </span>
                        <span className="flex items-center gap-2">
                          <FaPhone className="w-4 h-4" />
                          {enquiry.mobile}
                        </span>
                        {enquiry.companyName && (
                          <span className="flex items-center gap-2">
                            <FaBuilding className="w-4 h-4" />
                            {enquiry.companyName}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Subject for General Enquiry */}
                  {enquiry.subject && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-xs text-slate-600 mb-1">Subject</p>
                      <p className="text-sm font-semibold text-blue-700">{enquiry.subject}</p>
                    </div>
                  )}

                  {/* Message Preview */}
                  {enquiry.message && (
                    <p className="text-slate-600 text-sm line-clamp-2 bg-slate-50 p-3 rounded-lg">{enquiry.message}</p>
                  )}

                  {/* Date */}
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <FaCalendar className="w-3 h-3" />
                    {new Date(enquiry.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => viewDetails(enquiry)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 rounded-lg transition-all flex items-center gap-2 justify-center font-medium"
                  >
                    <FaEye /> View
                  </button>
                  <button
                    onClick={() => deleteEnquiry(enquiry._id)}
                    className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg transition-all flex items-center gap-2 justify-center font-medium"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div onClick={() => setShowDetailModal(false)} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200 p-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowDetailModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <FaTimesCircle className="w-6 h-6 text-slate-600" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <h2 className="text-3xl font-bold text-slate-900">Enquiry Details</h2>
                {getStatusBadge(selectedEnquiry.status)}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <FaCalendar className="w-4 h-4" />
                Received on{' '}
                {new Date(selectedEnquiry.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-slate-50 rounded-xl p-6 mb-6 space-y-4 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <FaUser className="text-blue-600" />
                Customer Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Name</p>
                  <p className="text-slate-900 font-medium">{selectedEnquiry.name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Email</p>
                  <p className="text-slate-900 font-medium">{selectedEnquiry.email}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Mobile</p>
                  <p className="text-slate-900 font-medium">{selectedEnquiry.mobile}</p>
                </div>
                {selectedEnquiry.companyName && (
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Company</p>
                    <p className="text-slate-900 font-medium">{selectedEnquiry.companyName}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Subject for General Enquiry */}
            {selectedEnquiry.subject && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Subject</h3>
                <p className="text-blue-700 font-bold text-lg">{selectedEnquiry.subject}</p>
              </div>
            )}

            {/* Message */}
            {selectedEnquiry.message && (
              <div className="bg-slate-50 rounded-xl p-6 mb-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Message</h3>
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{selectedEnquiry.message}</p>
              </div>
            )}

            {/* Status Actions */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => updateStatus(selectedEnquiry._id, 'read')}
                disabled={selectedEnquiry.status === 'read'}
                className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
              >
                <FaEye /> Mark as Read
              </button>
              <button
                onClick={() => updateStatus(selectedEnquiry._id, 'responded')}
                disabled={selectedEnquiry.status === 'responded'}
                className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
              >
                <FaReply /> Mark as Responded
              </button>
              <button
                onClick={() => updateStatus(selectedEnquiry._id, 'closed')}
                disabled={selectedEnquiry.status === 'closed'}
                className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
              >
                <FaCheckCircle /> Close Enquiry
              </button>
              <button
                onClick={() => deleteEnquiry(selectedEnquiry._id)}
                className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg transition-all flex items-center gap-2 ml-auto font-medium"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

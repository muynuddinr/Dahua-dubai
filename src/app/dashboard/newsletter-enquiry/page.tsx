'use client';

import { useState } from 'react';
import { FaSearch, FaEnvelope, FaTrash, FaCheckCircle } from 'react-icons/fa';

interface NewsletterSubscriber {
  id: string;
  email: string;
  name: string;
  subscribed: boolean;
  subscribedDate: string;
  lastEmailSent?: string;
}

const demoData: NewsletterSubscriber[] = [
  {
    id: '1',
    email: 'subscriber1@example.com',
    name: 'John Doe',
    subscribed: true,
    subscribedDate: '2024-01-15',
    lastEmailSent: '2024-01-20',
  },
  {
    id: '2',
    email: 'subscriber2@example.com',
    name: 'Jane Smith',
    subscribed: true,
    subscribedDate: '2024-01-10',
    lastEmailSent: '2024-01-20',
  },
  {
    id: '3',
    email: 'subscriber3@example.com',
    name: 'Ahmed Hassan',
    subscribed: false,
    subscribedDate: '2024-01-05',
  },
  {
    id: '4',
    email: 'subscriber4@example.com',
    name: 'Fatima Khan',
    subscribed: true,
    subscribedDate: '2024-01-18',
    lastEmailSent: '2024-01-20',
  },
  {
    id: '5',
    email: 'subscriber5@example.com',
    name: 'Mohammed Ali',
    subscribed: true,
    subscribedDate: '2024-01-12',
    lastEmailSent: '2024-01-20',
  },
];

export default function NewsletterEnquiryPage() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>(demoData);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSubscribers = subscribers.filter((sub) =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCount = subscribers.filter((sub) => sub.subscribed).length;
  const totalCount = subscribers.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Newsletter Subscribers</h1>
        <p className="text-slate-600 mt-2">Manage newsletter subscriptions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <p className="text-slate-600 text-sm mb-2">Total Subscribers</p>
          <p className="text-4xl font-bold text-slate-900">{totalCount}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <p className="text-slate-600 text-sm mb-2">Active Subscribers</p>
          <p className="text-4xl font-bold text-green-600">{activeCount}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <p className="text-slate-600 text-sm mb-2">Unsubscribed</p>
          <p className="text-4xl font-bold text-red-600">{totalCount - activeCount}</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <FaSearch className="absolute left-4 top-4 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Search by email or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                Email
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                Subscribed Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                Last Email
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredSubscribers.map((sub) => (
              <tr
                key={sub.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-slate-400" size={16} />
                    <span className="text-slate-900 font-medium">{sub.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">{sub.name}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        sub.subscribed ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        sub.subscribed
                          ? 'text-green-700'
                          : 'text-red-700'
                      }`}
                    >
                      {sub.subscribed ? 'Active' : 'Unsubscribed'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {new Date(sub.subscribedDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {sub.lastEmailSent
                    ? new Date(sub.lastEmailSent).toLocaleDateString()
                    : '-'}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

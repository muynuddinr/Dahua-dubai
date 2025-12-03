'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaSearch, 
  FaTimes, 
  FaCheck,
  FaLink,
  FaToggleOn,
  FaToggleOff,
  FaSave,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';

interface NavbarCategory {
  _id: string;
  name: string;
  slug: string;
  href: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function NavbarCategoryPage() {
  const [categories, setCategories] = useState<NavbarCategory[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<NavbarCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<NavbarCategory | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    href: '',
    order: 0,
    isActive: true,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  // Filter categories based on search
  useEffect(() => {
    const filtered = categories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.href.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchTerm, categories]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/navbar-category');
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editingCategory) {
        // Update
        const response = await axios.put('/api/navbar-category', {
          _id: editingCategory._id,
          ...formData,
        });
        if (response.data.success) {
          setSuccess('Category updated successfully!');
          fetchCategories();
          handleCloseModal();
        }
      } else {
        // Create
        const response = await axios.post('/api/navbar-category', formData);
        if (response.data.success) {
          setSuccess('Category created successfully!');
          fetchCategories();
          handleCloseModal();
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const response = await axios.delete(`/api/navbar-category?id=${id}`);
      if (response.data.success) {
        setSuccess('Category deleted successfully!');
        fetchCategories();
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete category');
    }
  };

  const handleEdit = (category: NavbarCategory) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      href: category.href,
      order: category.order,
      isActive: category.isActive,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({
      name: '',
      slug: '',
      href: '',
      order: 0,
      isActive: true,
    });
    setError('');
  };

  const handleToggleActive = async (category: NavbarCategory) => {
    try {
      await axios.put('/api/navbar-category', {
        _id: category._id,
        isActive: !category.isActive,
      });
      fetchCategories();
      setSuccess(`Category ${!category.isActive ? 'activated' : 'deactivated'} successfully!`);
    } catch (err) {
      setError('Failed to toggle category status');
    }
  };

  // Auto-generate slug from name
  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              Navbar Categories
            </h1>
            <p className="text-slate-400">Manage your navigation menu items</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
          >
            <FaPlus /> Add Category
          </motion.button>
        </div>
      </motion.div>

      {/* Success/Error Messages */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-4 bg-green-500/10 border border-green-500 rounded-xl text-green-400 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <FaCheck />
              <span>{success}</span>
            </div>
            <button onClick={() => setSuccess('')}>
              <FaTimes />
            </button>
          </motion.div>
        )}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded-xl text-red-400 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <FaTimes />
              <span>{error}</span>
            </div>
            <button onClick={() => setError('')}>
              <FaTimes />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search categories by name, slug, or URL..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
          />
        </div>
      </motion.div>

      {/* Categories Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl"
      >
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block w-12 h-12 border-4 border-slate-700 border-t-cyan-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-400">Loading categories...</p>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-slate-800 rounded-full flex items-center justify-center">
              <FaSearch className="w-10 h-10 text-slate-600" />
            </div>
            <p className="text-slate-400 text-lg">No categories found</p>
            <p className="text-slate-500 text-sm mt-2">
              {searchTerm ? 'Try adjusting your search' : 'Get started by adding a new category'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-950">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    URL Path
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredCategories.map((category, index) => (
                  <motion.tr
                    key={category._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-slate-800/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-300 font-semibold text-lg">
                          {category.order}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                          {category.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-white font-medium">{category.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <code className="px-3 py-1 bg-slate-800 text-cyan-400 rounded-lg text-sm font-mono">
                        {category.slug}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-400">
                        <FaLink className="w-3 h-3" />
                        <span className="text-sm">{category.href}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleActive(category)}
                        className="group/toggle flex items-center gap-2"
                      >
                        {category.isActive ? (
                          <>
                            <FaEye className="w-4 h-4 text-green-400" />
                            <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-lg text-xs font-semibold border border-green-500/20">
                              Active
                            </span>
                          </>
                        ) : (
                          <>
                            <FaEyeSlash className="w-4 h-4 text-red-400" />
                            <span className="px-3 py-1 bg-red-500/10 text-red-400 rounded-lg text-xs font-semibold border border-red-500/20">
                              Inactive
                            </span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(category)}
                          className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <FaEdit className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(category._id)}
                          className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <FaTrash className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Stats Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Categories</p>
              <p className="text-2xl font-bold text-white">{categories.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <FaLink className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Active</p>
              <p className="text-2xl font-bold text-green-400">
                {categories.filter((c) => c.isActive).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <FaEye className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </div>
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Inactive</p>
              <p className="text-2xl font-bold text-red-400">
                {categories.filter((c) => !c.isActive).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
              <FaEyeSlash className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-slate-900 rounded-2xl border border-slate-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                {/* Modal Header */}
                <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-cyan-500 p-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">
                    {editingCategory ? 'Edit Category' : 'Add New Category'}
                  </h2>
                  <button
                    onClick={handleCloseModal}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <FaTimes className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Category Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      required
                      placeholder="e.g., Solutions"
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Slug *
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value })
                      }
                      required
                      placeholder="e.g., solutions"
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all font-mono"
                    />
                    <p className="mt-2 text-xs text-slate-400">
                      Auto-generated from name. Use lowercase with hyphens.
                    </p>
                  </div>

                  {/* URL Path */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      URL Path *
                    </label>
                    <div className="flex items-center gap-2">
                      <FaLink className="text-slate-400" />
                      <input
                        type="text"
                        value={formData.href}
                        onChange={(e) =>
                          setFormData({ ...formData, href: e.target.value })
                        }
                        required
                        placeholder="e.g., /solutions"
                        className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all font-mono"
                      />
                    </div>
                  </div>

                  {/* Order */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) =>
                        setFormData({ ...formData, order: parseInt(e.target.value) })
                      }
                      min="0"
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    />
                    <p className="mt-2 text-xs text-slate-400">
                      Lower numbers appear first in the navigation menu.
                    </p>
                  </div>

                  {/* Active Toggle */}
                  <div className="flex items-center justify-between p-4 bg-slate-800 rounded-xl">
                    <div>
                      <p className="font-semibold text-white">Active Status</p>
                      <p className="text-sm text-slate-400">
                        Display this category in the navigation menu
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, isActive: !formData.isActive })
                      }
                      className="relative"
                    >
                      {formData.isActive ? (
                        <FaToggleOn className="w-12 h-12 text-green-400" />
                      ) : (
                        <FaToggleOff className="w-12 h-12 text-slate-600" />
                      )}
                    </button>
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-3 pt-4">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCloseModal}
                      className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition-colors"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
                    >
                      <FaSave />
                      {editingCategory ? 'Update Category' : 'Create Category'}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { getToken, logout, getUser } from '@/lib/auth';

export default function AdminPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    domain: '',
    skillLevel: '',
    timeline: '',
  });
  const user = getUser();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/auth/login');
      return;
    }

    if (user?.role !== 'ADMIN') {
      router.push('/dashboard');
      return;
    }

    loadTemplates();
  }, [router, user]);

  const loadTemplates = async () => {
    try {
      const token = getToken();
      if (!token) return;

      const data = await api.getTemplates(token);
      if (!data.error) {
        setTemplates(data);
      }
    } catch (err) {
      console.error('Error loading templates:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = getToken();
      if (!token) return;

      const result = await api.createTemplate(token, formData);
      
      if (!result.error) {
        setFormData({ title: '', description: '', domain: '', skillLevel: '', timeline: '' });
        setShowCreateForm(false);
        loadTemplates();
      }
    } catch (err) {
      console.error('Error creating template:', err);
    }
  };

  const handleDeleteTemplate = async (id: string) => {
    if (!confirm('Are you sure you want to delete this template?')) return;

    try {
      const token = getToken();
      if (!token) return;

      await api.deleteTemplate(token, id);
      loadTemplates();
    } catch (err) {
      console.error('Error deleting template:', err);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Admin: {user?.name}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Roadmap Templates</h2>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {showCreateForm ? 'Cancel' : 'Create Template'}
          </button>
        </div>

        {showCreateForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Create New Template</h3>
            <form onSubmit={handleCreateTemplate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Domain</label>
                  <select
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Mobile Development">Mobile Development</option>
                    <option value="DevOps">DevOps</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skill Level</label>
                  <select
                    value={formData.skillLevel}
                    onChange={(e) => setFormData({ ...formData, skillLevel: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Timeline</label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select</option>
                    <option value="3 months">3 months</option>
                    <option value="6 months">6 months</option>
                    <option value="1 year">1 year</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Create Template
              </button>
            </form>
          </div>
        )}

        <div className="grid gap-6">
          {templates.map((template) => (
            <div key={template.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{template.title}</h3>
                  <p className="text-gray-600 mt-2">{template.description}</p>
                </div>
                <button
                  onClick={() => handleDeleteTemplate(template.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                >
                  Delete
                </button>
              </div>

              <div className="flex gap-3 mb-4">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {template.domain}
                </span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  {template.skillLevel}
                </span>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                  {template.timeline}
                </span>
              </div>

              {template.steps && template.steps.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Steps ({template.steps.length})</h4>
                  <div className="space-y-2">
                    {template.steps.map((step: any) => (
                      <div key={step.id} className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                        <span className="font-medium">Step {step.order}:</span> {step.title}
                        {step.resources && step.resources.length > 0 && (
                          <span className="ml-2 text-gray-500">({step.resources.length} resources)</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {templates.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-600">
              No templates created yet. Click "Create Template" to add your first template.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

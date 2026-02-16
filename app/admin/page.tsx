'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { getToken } from '@/lib/auth';
import { useAuthGuard } from '@/hooks/useAuthGuard';

export default function AdminPage() {
  useAuthGuard({ adminOnly: true });
  const router = useRouter();
  const [templates, setTemplates] = useState<any[]>([]);
  const [formData, setFormData] = useState({ title: '', description: '', domain: '', skillLevel: '', timeline: '' });

  const loadTemplates = async () => {
    const token = getToken();
    if (!token) return router.push('/auth/login');
    const result = await api.getTemplates(token);
    if (!result.error) setTemplates(result);
  };

  useEffect(() => { loadTemplates(); }, []);

  const createTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getToken();
    if (!token) return;
    const result = await api.createTemplate(token, formData);
    if (!result.error) {
      setFormData({ title: '', description: '', domain: '', skillLevel: '', timeline: '' });
      loadTemplates();
    }
  };

  const stats = useMemo(() => ({
    totalUsers: 'N/A',
    activeUsers: 'N/A',
    topGoal: 'Get a Job',
    topDomain: templates[0]?.domain || 'N/A',
  }), [templates]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl space-y-4">
        <h1 className="text-3xl font-bold">Admin Panel</h1>

        <div className="grid gap-4 md:grid-cols-4">
          <Card title="Total Users" value={stats.totalUsers} />
          <Card title="Active Users" value={stats.activeUsers} />
          <Card title="Most Selected Goal" value={stats.topGoal} />
          <Card title="Most Selected Domain" value={stats.topDomain} />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <form onSubmit={createTemplate} className="rounded-2xl bg-white p-5 shadow-sm lg:col-span-1">
            <h2 className="mb-3 text-lg font-semibold">Create Roadmap Template</h2>
            <div className="space-y-2">
              {Object.entries(formData).map(([key, value]) => (
                <input key={key} required placeholder={key} value={value} onChange={(e) => setFormData({ ...formData, [key]: e.target.value })} className="w-full rounded-xl border p-2" />
              ))}
            </div>
            <button className="mt-3 w-full rounded-xl bg-indigo-600 py-2 font-semibold text-white">Create</button>
          </form>

          <div className="rounded-2xl bg-white p-5 shadow-sm lg:col-span-2">
            <h2 className="mb-3 text-lg font-semibold">Edit Steps & Add Resources</h2>
            <div className="space-y-3">
              {templates.map((template) => (
                <div key={template.id} className="rounded-xl border p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{template.title}</p>
                      <p className="text-sm text-gray-500">{template.domain} · {template.skillLevel}</p>
                    </div>
                    <button onClick={async () => {
                      const token = getToken();
                      if (!token) return;
                      await api.deleteTemplate(token, template.id);
                      loadTemplates();
                    }} className="rounded-lg bg-red-50 px-3 py-1 text-sm text-red-600">Delete</button>
                  </div>
                  <p className="mt-2 text-sm">Steps: {template.steps.length}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold">View Users & Analytics</h2>
          <p className="text-sm text-gray-600">User-level analytics endpoints are not yet exposed in the current backend API. This panel is wired for template analytics and ready for user analytics integration.</p>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}

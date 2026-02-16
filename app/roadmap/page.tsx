'use client';

import { useEffect, useState } from 'react';
import { DashboardShell } from '@/components/dashboard-shell';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { api } from '@/lib/api';
import { getToken } from '@/lib/auth';
import { UserRoadmapItem } from '@/lib/roadmap';

export default function RoadmapPage() {
  useAuthGuard();
  const [roadmap, setRoadmap] = useState<UserRoadmapItem | null>(null);

  const load = async () => {
    const token = getToken();
    if (!token) return;
    const result = await api.getUserRoadmaps(token);
    if (!result.error) setRoadmap(result[0] || null);
  };

  useEffect(() => { load(); }, []);

  const toggleCompletion = async (stepId: string, currentStatus: boolean) => {
    const token = getToken();
    if (!token) return;
    await api.updateProgress(token, { stepId, completed: !currentStatus });
    load();
  };

  return (
    <DashboardShell>
      <h2 className="mb-4 text-2xl font-bold">Your Roadmap</h2>
      <div className="space-y-3">
        {roadmap?.template.steps.map((step) => {
          const completed = step.progress?.[0]?.completed;
          const free = step.resources.filter((r) => r.tier === 'FREE');
          const premium = step.resources.filter((r) => r.tier === 'PREMIUM');
          return (
            <article key={step.id} className="rounded-2xl border p-5">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-semibold">{step.order}. {step.title}</h3>
                <span className="text-sm text-gray-500">{step.duration}</span>
              </div>
              <p className="mb-3 text-sm text-gray-600">{step.description}</p>
              <div className="grid gap-4 md:grid-cols-2 text-sm">
                <div>
                  <p className="mb-1 font-semibold text-emerald-600">Free Resources</p>
                  <ul className="space-y-1">{free.map((r) => <li key={r.id}><a href={r.url} target="_blank" className="text-indigo-600">{r.title}</a></li>)}</ul>
                </div>
                <div>
                  <p className="mb-1 font-semibold text-indigo-600">Premium Resources</p>
                  <ul className="space-y-1">{premium.map((r) => <li key={r.id}><a href={r.url} target="_blank" className="text-indigo-600">{r.title}</a></li>)}</ul>
                </div>
              </div>
              <button onClick={() => toggleCompletion(step.id, Boolean(completed))} className={`mt-4 rounded-xl px-4 py-2 text-sm font-semibold ${completed ? 'bg-gray-200' : 'bg-emerald-500 text-white'}`}>
                {completed ? 'Mark as Incomplete' : 'Mark as Complete'}
              </button>
            </article>
          );
        })}
      </div>
    </DashboardShell>
  );
}

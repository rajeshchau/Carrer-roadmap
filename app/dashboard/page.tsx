'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { DashboardShell } from '@/components/dashboard-shell';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { api } from '@/lib/api';
import { getToken } from '@/lib/auth';
import { UserRoadmapItem, getCompletion } from '@/lib/roadmap';

export default function DashboardPage() {
  useAuthGuard();
  const [roadmaps, setRoadmaps] = useState<UserRoadmapItem[]>([]);

  useEffect(() => {
    const load = async () => {
      const token = getToken();
      if (!token) return;
      const result = await api.getUserRoadmaps(token);
      if (!result.error) setRoadmaps(result);
    };
    load();
  }, []);

  const primaryRoadmap = roadmaps[0];
  const completion = useMemo(() => getCompletion(primaryRoadmap?.template.steps || []), [primaryRoadmap]);
  const currentStep = primaryRoadmap?.template.steps.find((step) => !step.progress?.[0]?.completed);

  return (
    <DashboardShell>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border p-5 md:col-span-2">
          <p className="mb-2 text-sm text-gray-500">Overall Progress</p>
          <p className="text-3xl font-bold text-indigo-600">{completion.percentage}%</p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200"><div className="h-full bg-emerald-500" style={{ width: `${completion.percentage}%` }} /></div>
        </div>
        <div className="rounded-2xl border p-5">
          <p className="text-sm text-gray-500">Roadmaps</p>
          <p className="text-3xl font-bold">{roadmaps.length}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border p-5">
          <h2 className="mb-3 text-lg font-semibold">Current Step</h2>
          {currentStep ? (
            <>
              <p className="font-medium">{currentStep.title}</p>
              <p className="text-sm text-gray-500">{currentStep.description}</p>
              <p className="mt-2 text-sm text-indigo-600">Est. Duration: {currentStep.duration}</p>
            </>
          ) : (
            <p className="text-sm text-gray-600">No pending step. Great work!</p>
          )}
        </div>

        <div className="rounded-2xl border p-5">
          <h2 className="mb-3 text-lg font-semibold">Upcoming Steps</h2>
          <ul className="space-y-2 text-sm">
            {(primaryRoadmap?.template.steps || [])
              .filter((step) => !step.progress?.[0]?.completed)
              .slice(0, 4)
              .map((step) => <li key={step.id} className="rounded-lg bg-gray-50 p-2">{step.title}</li>)}
          </ul>
          <Link href="/roadmap" className="mt-4 inline-block text-sm font-semibold text-indigo-600">View full roadmap →</Link>
        </div>
      </div>
    </DashboardShell>
  );
}

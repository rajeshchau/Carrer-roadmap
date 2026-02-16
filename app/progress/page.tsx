'use client';

import { useEffect, useMemo, useState } from 'react';
import { DashboardShell } from '@/components/dashboard-shell';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { api } from '@/lib/api';
import { getToken } from '@/lib/auth';
import { UserRoadmapItem, getCompletion } from '@/lib/roadmap';

export default function ProgressPage() {
  useAuthGuard();
  const [roadmap, setRoadmap] = useState<UserRoadmapItem | null>(null);

  useEffect(() => {
    const load = async () => {
      const token = getToken();
      if (!token) return;
      const result = await api.getUserRoadmaps(token);
      if (!result.error) setRoadmap(result[0] || null);
    };
    load();
  }, []);

  const completion = useMemo(() => getCompletion(roadmap?.template.steps || []), [roadmap]);
  const remaining = completion.total - completion.completed;
  const timelineProjection = `${Math.max(1, remaining * 2)} weeks`;

  return (
    <DashboardShell>
      <h2 className="mb-4 text-2xl font-bold">Progress Analytics</h2>
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Completion %" value={`${completion.percentage}%`} />
        <StatCard label="Completed steps" value={`${completion.completed}`} />
        <StatCard label="Remaining steps" value={`${remaining}`} />
        <StatCard label="Timeline projection" value={timelineProjection} />
      </div>

      <div className="mt-4 rounded-2xl border p-5">
        <p className="mb-3 text-sm text-gray-500">Step completion chart</p>
        <div className="flex items-end gap-2 h-40">
          {(roadmap?.template.steps || []).map((step) => {
            const done = step.progress?.[0]?.completed;
            return <div key={step.id} title={step.title} className={`flex-1 rounded-t ${done ? 'bg-emerald-500 h-36' : 'bg-gray-200 h-16'}`} />;
          })}
        </div>
      </div>
    </DashboardShell>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}

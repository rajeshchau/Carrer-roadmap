'use client';

import { DashboardShell } from '@/components/dashboard-shell';
import { useAuthGuard } from '@/hooks/useAuthGuard';

export default function SettingsPage() {
  useAuthGuard();
  return (
    <DashboardShell>
      <h2 className="text-2xl font-bold">Settings</h2>
      <p className="mt-2 text-gray-600">Profile and billing settings will appear here.</p>
    </DashboardShell>
  );
}

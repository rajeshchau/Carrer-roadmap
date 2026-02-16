'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { getUser, logout } from '@/lib/auth';

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/roadmap', label: 'Roadmap' },
  { href: '/progress', label: 'Progress' },
  { href: '/settings', label: 'Settings' },
];

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const user = getUser();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto flex max-w-7xl gap-4 p-4 lg:p-6">
        <aside className={`rounded-2xl bg-white shadow-sm transition-all ${collapsed ? 'w-20' : 'w-64'} p-4`}>
          <div className="mb-8 flex items-center justify-between">
            {!collapsed && <p className="text-lg font-semibold text-indigo-600">PathForge</p>}
            <button
              onClick={() => setCollapsed((v) => !v)}
              className="rounded-lg border border-gray-200 px-2 py-1 text-sm"
              aria-label="Toggle sidebar"
            >
              {collapsed ? '→' : '←'}
            </button>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-xl px-3 py-2 text-sm font-medium ${
                    active ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {collapsed ? item.label[0] : item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 rounded-2xl bg-white p-4 shadow-sm lg:p-6">
          <header className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h1 className="text-xl font-semibold">Welcome back, {user?.name || 'Learner'}</h1>
              <p className="text-sm text-gray-500">Build your roadmap and stay on track.</p>
            </div>
            <button
              onClick={() => {
                logout();
                router.push('/');
              }}
              className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200"
            >
              Logout
            </button>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}

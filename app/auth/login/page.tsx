'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { setToken, setUser } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: 'demo@career-roadmap.com', password: 'demo123' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await api.login(formData);
      if (result.error) {
        setError(result.issue ? `${result.error} (${result.issue})` : result.error);
      } else {
        setToken(result.token);
        setUser(result.user);
        router.push(result.user.role === 'ADMIN' ? '/admin' : '/dashboard');
      }
    } catch {
      setError('Unable to login right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-3xl font-bold">Login</h1>
        <p className="mb-6 text-gray-600">Welcome back to PathForge.</p>
        {error && <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <div className="mb-4 rounded-lg border border-indigo-100 bg-indigo-50 p-3 text-sm text-indigo-800">
          <p className="font-semibold">Default test credentials</p>
          <p>Learner: demo@career-roadmap.com / demo123</p>
          <p>Admin: admin@career-roadmap.com / admin123</p>
        </div>

        <div className="space-y-4">
          <input type="email" placeholder="Email" required className="w-full rounded-xl border p-3" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <input type="password" placeholder="Password" required className="w-full rounded-xl border p-3" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          <button disabled={loading} className="w-full rounded-xl bg-indigo-600 p-3 font-semibold text-white hover:bg-indigo-700">{loading ? 'Logging in...' : 'Login'}</button>
        </div>
        <p className="mt-5 text-sm text-gray-600">No account? <Link href="/auth/signup" className="font-semibold text-indigo-600">Sign up</Link></p>
      </form>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { setToken, setUser } from '@/lib/auth';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const result = await api.signup(formData);
      if (result.error) {
        setError(result.error);
      } else {
        setToken(result.token);
        setUser(result.user);
        router.push('/onboarding');
      }
    } catch {
      setError('Unable to sign up right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-3xl font-bold">Create account</h1>
        <p className="mb-6 text-gray-600">Start your personalized roadmap journey.</p>
        {error && <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <div className="space-y-4">
          <input type="text" placeholder="Name" required className="w-full rounded-xl border p-3" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <input type="email" placeholder="Email" required className="w-full rounded-xl border p-3" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <input type="password" placeholder="Password" required className="w-full rounded-xl border p-3" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          <input type="password" placeholder="Confirm password" required className="w-full rounded-xl border p-3" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />
          <button disabled={loading} className="w-full rounded-xl bg-indigo-600 p-3 font-semibold text-white hover:bg-indigo-700">{loading ? 'Creating...' : 'Sign up'}</button>
        </div>
        <p className="mt-5 text-sm text-gray-600">Already have an account? <Link href="/auth/login" className="font-semibold text-indigo-600">Login</Link></p>
      </form>
    </div>
  );
}

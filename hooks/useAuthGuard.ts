'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, getUser } from '@/lib/auth';

export function useAuthGuard(options?: { adminOnly?: boolean }) {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    const user = getUser();

    if (!token) {
      router.push('/auth/login');
      return;
    }

    if (options?.adminOnly && user?.role !== 'ADMIN') {
      router.push('/dashboard');
    }
  }, [router, options?.adminOnly]);
}

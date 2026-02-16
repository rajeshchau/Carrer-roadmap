'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { getToken } from '@/lib/auth';
import { useAuthGuard } from '@/hooks/useAuthGuard';

const options = [
  { key: 'skillLevel', title: 'Step 1 – Skill Level', values: ['Beginner', 'Intermediate', 'Advanced'] },
  { key: 'goal', title: 'Step 2 – Goal', values: ['Get a Job', 'Upskill', 'Career Switch'] },
  { key: 'timeline', title: 'Step 3 – Timeline', values: ['3 months', '6 months', '1 year'] },
  { key: 'domain', title: 'Step 4 – Domain', values: ['Frontend', 'Backend', 'Data', 'AI'] },
] as const;

type QuizData = { skillLevel: string; goal: string; timeline: string; domain: string };

export default function OnboardingPage() {
  useAuthGuard();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<QuizData>({ skillLevel: '', goal: '', timeline: '', domain: '' });
  const [loading, setLoading] = useState(false);
  const current = options[step];
  const progress = useMemo(() => ((step + 1) / options.length) * 100, [step]);

  const onNext = async () => {
    if (!data[current.key]) return;
    if (step < options.length - 1) {
      setStep((s) => s + 1);
      return;
    }

    setLoading(true);
    const token = getToken();
    if (!token) return;

    const result = await api.submitQuiz(token, data);
    if (!result.error) {
      await api.generateRoadmap(token);
      router.push('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl items-center px-4">
      <div className="w-full rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-6 h-2 overflow-hidden rounded-full bg-gray-200">
          <div className="h-full bg-indigo-600" style={{ width: `${progress}%` }} />
        </div>
        <h1 className="mb-5 text-2xl font-bold">{current.title}</h1>

        <div className="space-y-3">
          {current.values.map((value) => (
            <button
              key={value}
              onClick={() => setData({ ...data, [current.key]: value })}
              className={`w-full rounded-xl border p-3 text-left ${data[current.key] === value ? 'border-indigo-600 bg-indigo-50' : 'hover:bg-gray-50'}`}
            >
              {value}
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-between">
          <button disabled={step === 0} onClick={() => setStep((s) => s - 1)} className="rounded-xl bg-gray-100 px-4 py-2 disabled:opacity-50">Back</button>
          <button onClick={onNext} disabled={!data[current.key] || loading} className="rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white disabled:opacity-50">{step === options.length - 1 ? (loading ? 'Submitting...' : 'Submit') : 'Next'}</button>
        </div>
      </div>
    </div>
  );
}

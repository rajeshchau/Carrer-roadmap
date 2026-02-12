'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { getToken, logout } from '@/lib/auth';

export default function QuizPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    skillLevel: '',
    goal: '',
    timeline: '',
    domain: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/auth/login');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = getToken();
      if (!token) {
        router.push('/auth/login');
        return;
      }

      const result = await api.submitQuiz(token, formData);
      
      if (result.error) {
        setError(result.error);
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-3xl mx-auto pt-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
            Onboarding Quiz
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Let's personalize your learning journey
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What is your current skill level?
              </label>
              <div className="space-y-2">
                {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                  <label key={level} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="skillLevel"
                      value={level}
                      checked={formData.skillLevel === level}
                      onChange={(e) => setFormData({ ...formData, skillLevel: e.target.value })}
                      className="mr-3"
                      required
                    />
                    <span>{level}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What is your career goal?
              </label>
              <input
                type="text"
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Full Stack Developer, Data Scientist"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What is your preferred timeline?
              </label>
              <div className="space-y-2">
                {['3 months', '6 months', '1 year'].map((time) => (
                  <label key={time} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="timeline"
                      value={time}
                      checked={formData.timeline === time}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="mr-3"
                      required
                    />
                    <span>{time}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Which domain interests you?
              </label>
              <div className="space-y-2">
                {['Web Development', 'Data Science', 'Mobile Development', 'DevOps'].map((dom) => (
                  <label key={dom} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="domain"
                      value={dom}
                      checked={formData.domain === dom}
                      onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                      className="mr-3"
                      required
                    />
                    <span>{dom}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit & Generate Roadmap'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

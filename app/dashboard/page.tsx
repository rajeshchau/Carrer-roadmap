'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { getToken, logout, getUser } from '@/lib/auth';

export default function DashboardPage() {
  const router = useRouter();
  const [roadmaps, setRoadmaps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatingRoadmap, setGeneratingRoadmap] = useState(false);
  const [error, setError] = useState('');
  const user = getUser();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/auth/login');
      return;
    }

    loadRoadmaps();
  }, [router]);

  const loadRoadmaps = async () => {
    try {
      const token = getToken();
      if (!token) return;

      const data = await api.getUserRoadmaps(token);
      if (!data.error) {
        setRoadmaps(data);
      }
    } catch (err) {
      console.error('Error loading roadmaps:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateRoadmap = async () => {
    setGeneratingRoadmap(true);
    setError('');

    try {
      const token = getToken();
      if (!token) {
        router.push('/auth/login');
        return;
      }

      const result = await api.generateRoadmap(token);
      
      if (result.error) {
        setError(result.error);
      } else {
        loadRoadmaps();
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setGeneratingRoadmap(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const toggleStepCompletion = async (stepId: string, currentStatus: boolean) => {
    try {
      const token = getToken();
      if (!token) return;

      await api.updateProgress(token, { stepId, completed: !currentStatus });
      loadRoadmaps();
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  };

  const calculateProgress = (roadmap: any) => {
    const steps = roadmap.template?.steps || [];
    const completedSteps = steps.filter((step: any) => 
      step.progress && step.progress.length > 0 && step.progress[0].completed
    ).length;
    return steps.length > 0 ? Math.round((completedSteps / steps.length) * 100) : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Career Roadmap Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {user?.name}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {roadmaps.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">No Roadmaps Yet</h2>
            <p className="text-gray-600 mb-6">Generate your personalized learning roadmap to get started</p>
            <button
              onClick={handleGenerateRoadmap}
              disabled={generatingRoadmap}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {generatingRoadmap ? 'Generating...' : 'Generate Roadmap'}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {roadmaps.map((roadmap) => {
              const progress = calculateProgress(roadmap);
              return (
                <div key={roadmap.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {roadmap.template?.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{roadmap.template?.description}</p>
                    
                    <div className="flex gap-4 text-sm text-gray-600 mb-4">
                      <span className="bg-blue-100 px-3 py-1 rounded-full">
                        {roadmap.template?.domain}
                      </span>
                      <span className="bg-green-100 px-3 py-1 rounded-full">
                        {roadmap.template?.skillLevel}
                      </span>
                      <span className="bg-purple-100 px-3 py-1 rounded-full">
                        {roadmap.template?.timeline}
                      </span>
                    </div>

                    <div className="mb-2">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-blue-600 h-3 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Learning Steps</h3>
                    {roadmap.template?.steps?.map((step: any, index: number) => {
                      const isCompleted = step.progress && step.progress.length > 0 && step.progress[0].completed;
                      
                      return (
                        <div
                          key={step.id}
                          className={`border rounded-lg p-4 ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-start flex-1">
                              <input
                                type="checkbox"
                                checked={isCompleted}
                                onChange={() => toggleStepCompletion(step.id, isCompleted)}
                                className="mt-1 mr-3 w-5 h-5 cursor-pointer"
                              />
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-800">
                                  Step {step.order}: {step.title}
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                                <p className="text-sm text-blue-600 mt-1">Duration: {step.duration}</p>
                              </div>
                            </div>
                          </div>

                          {step.resources && step.resources.length > 0 && (
                            <div className="mt-4 ml-8">
                              <p className="text-sm font-semibold text-gray-700 mb-2">Resources:</p>
                              <div className="space-y-2">
                                {step.resources.map((resource: any) => (
                                  <div key={resource.id} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                      <span className={`px-2 py-1 rounded text-xs ${resource.tier === 'FREE' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {resource.tier}
                                      </span>
                                      <span className="text-gray-700">{resource.title}</span>
                                      <span className="text-gray-500">({resource.type})</span>
                                    </div>
                                    <a
                                      href={resource.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:underline"
                                    >
                                      View
                                    </a>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

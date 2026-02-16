const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

async function request(path: string, options: RequestInit = {}) {
  const response = await fetch(`${API_URL}${path}`, options);
  return response.json();
}

export const api = {
  signup: async (data: { email: string; password: string; name: string }) =>
    request('/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),

  login: async (data: { email: string; password: string; remember?: boolean }) =>
    request('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: data.email, password: data.password }),
    }),

  getProfile: async (token: string) =>
    request('/auth/profile', { headers: { Authorization: `Bearer ${token}` } }),

  submitQuiz: async (token: string, data: { skillLevel: string; goal: string; timeline: string; domain: string }) =>
    request('/quiz/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }),

  getQuizResult: async (token: string) =>
    request('/quiz/result', { headers: { Authorization: `Bearer ${token}` } }),

  generateRoadmap: async (token: string) =>
    request('/roadmap/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }),

  getUserRoadmaps: async (token: string) =>
    request('/roadmap/my-roadmaps', { headers: { Authorization: `Bearer ${token}` } }),

  updateProgress: async (token: string, data: { stepId: string; completed: boolean }) =>
    request('/progress/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }),

  getTemplates: async (token: string) =>
    request('/admin/templates', { headers: { Authorization: `Bearer ${token}` } }),

  createTemplate: async (token: string, data: unknown) =>
    request('/admin/templates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }),

  deleteTemplate: async (token: string, id: string) =>
    request(`/admin/templates/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }),
};

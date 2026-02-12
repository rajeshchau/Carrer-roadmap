const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = {
  // Auth
  signup: async (data: { email: string; password: string; name: string }) => {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  login: async (data: { email: string; password: string }) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getProfile: async (token: string) => {
    const res = await fetch(`${API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },

  // Quiz
  submitQuiz: async (token: string, data: any) => {
    const res = await fetch(`${API_URL}/quiz/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getQuizResult: async (token: string) => {
    const res = await fetch(`${API_URL}/quiz/result`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },

  // Roadmap
  generateRoadmap: async (token: string) => {
    const res = await fetch(`${API_URL}/roadmap/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  },

  getUserRoadmaps: async (token: string) => {
    const res = await fetch(`${API_URL}/roadmap/my-roadmaps`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },

  getRoadmapDetails: async (token: string, id: string) => {
    const res = await fetch(`${API_URL}/roadmap/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },

  // Progress
  updateProgress: async (token: string, data: { stepId: string; completed: boolean }) => {
    const res = await fetch(`${API_URL}/progress/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getProgress: async (token: string, roadmapId: string) => {
    const res = await fetch(`${API_URL}/progress/${roadmapId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },

  // Admin
  getTemplates: async (token: string) => {
    const res = await fetch(`${API_URL}/admin/templates`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },

  createTemplate: async (token: string, data: any) => {
    const res = await fetch(`${API_URL}/admin/templates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteTemplate: async (token: string, id: string) => {
    const res = await fetch(`${API_URL}/admin/templates/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },
};

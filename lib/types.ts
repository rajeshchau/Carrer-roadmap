export interface User {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
  createdAt?: Date;
}

export interface QuizResult {
  id: string;
  userId: string;
  skillLevel: string;
  goal: string;
  timeline: string;
  domain: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface ResourceItem {
  id: string;
  title: string;
  url: string;
  type: string;
  tier: 'FREE' | 'PREMIUM';
}

export interface StepItem {
  id: string;
  order: number;
  title: string;
  description: string;
  duration: string;
  resources: ResourceItem[];
  progress: { completed: boolean }[];
}

export interface UserRoadmapItem {
  id: string;
  template: {
    title: string;
    domain: string;
    timeline: string;
    steps: StepItem[];
  };
}

export const getCompletion = (steps: StepItem[]) => {
  const completed = steps.filter((step) => step.progress?.[0]?.completed).length;
  const total = steps.length;
  return {
    completed,
    total,
    percentage: total ? Math.round((completed / total) * 100) : 0,
  };
};

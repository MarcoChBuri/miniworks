export interface Project {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  duration: string;
  budget: string;
  tags: string[];
  icon: string;
}

export interface Applicant {
  id: string;
  name: string;
  role: string;
  education: string;
  age: number;
  avatar: string;
  reviews: Review[];
}

export interface Review {
  id: string;
  author: string;
  authorAvatar: string;
  date: string;
  rating: number;
  content: string;
}

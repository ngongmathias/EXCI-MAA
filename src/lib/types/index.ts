export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface Office {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  email: string;
  services: string[];
  image?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image?: string;
  attendees: number;
  maxAttendees?: number;
}

export interface EventImage {
  id: string;
  event_id: string;
  image_url: string;
  display_order: number;
  caption?: string;
  is_primary: boolean;
  uploaded_by?: string;
  created_at: string;
  updated_at?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  image?: string;
  likes: number;
  comments: number;
  category: string;
  tags: string[];
}

export interface PostImage {
  id: string;
  post_id: string;
  image_url: string;
  display_order: number;
  caption?: string;
  is_primary: boolean;
  uploaded_by?: string;
  created_at: string;
  updated_at?: string;
}



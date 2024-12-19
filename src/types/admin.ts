export interface AdminStats {
  totalUsers: number;
  totalEvents: number;
  activeEvents: number;
  totalRevenue: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'suspended';
  createdAt: string;
  updatedAt: string;
}

export interface AdminEvent {
  id: string;
  title: string;
  organizer: string;
  date: string;
  status: 'active' | 'cancelled';
}
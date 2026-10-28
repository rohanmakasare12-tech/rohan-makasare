export type Priority = 'high' | 'medium' | 'low';
export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  subject: string;
  subjectCode: string;
  dueDate: string; // ISO date or 'Tomorrow', 'In 2 days', etc.
  dueTime?: string;
  priority: Priority;
  status: TaskStatus;
  progress: number; // 0 - 100
  estimatedMinutes: number;
  subtasks: Subtask[];
  aiTip?: string;
  tags: string[];
}

export type EventCategory = 'Hackathon' | 'Workshop' | 'Tech' | 'Cultural' | 'Sports' | 'Career';

export interface CampusEvent {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  time: string;
  venue: string;
  organizer: string;
  attendeesCount: number;
  isRsvp: boolean;
  featured?: boolean;
  description: string;
  tags: string[];
}

export type ItemType = 'lost' | 'found';
export type ItemCategory = 'Electronics' | 'ID Cards' | 'Books & Notes' | 'Accessories' | 'Other';

export interface LostAndFoundItem {
  id: string;
  title: string;
  type: ItemType;
  category: ItemCategory;
  location: string;
  dateReported: string;
  finderOrOwner: string;
  contact: string;
  status: 'open' | 'claimed' | 'resolved';
  description: string;
  badge?: string;
}

export type AnnouncementUrgency = 'urgent' | 'important' | 'normal';
export type Department = 'Dean Office' | 'Academics' | 'Examination Cell' | 'Placement & Training' | 'Student Affairs';

export interface Announcement {
  id: string;
  title: string;
  department: Department;
  date: string;
  urgency: AnnouncementUrgency;
  content: string;
  downloadUrl?: string;
  hasRead: boolean;
}

export interface StudySession {
  id: string;
  subject: string;
  durationMinutes: number;
  completedAt: string;
  date: string;
  notes?: string;
}

export interface WhatsNextRecommendation {
  id: string;
  title: string;
  context: string;
  reason: string;
  recommendedAction: string;
  actionLabel: string;
  actionType: 'start_pomodoro' | 'view_assignment' | 'rsvp_event' | 'review_announcement' | 'rest_break';
  urgency: 'critical' | 'high' | 'medium' | 'low';
  estimatedMinutes: number;
  relatedTaskId?: string;
  scenarioName?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestedActions?: {
    label: string;
    actionType: string;
    payload?: any;
  }[];
}

export interface StudentProfile {
  name: string;
  rollNo: string;
  major: string;
  semester: string;
  university: string;
  avatarUrl: string;
  streakDays: number;
  totalStudyHours: number;
  gpa: number;
  dailyGoalMinutes: number;
}

export type AuthMode = 'login' | 'signup' | 'forgot_password';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  collegeName: string;
  courseBranch: string;
  year: string;
  rollNo: string;
  avatarUrl: string;
  createdAt: string;
}

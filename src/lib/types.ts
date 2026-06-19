export type EventCategory = "school" | "tutoring" | "activity" | "exam" | "family";

export type Child = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  grade: string;
  schoolName: string;
  schoolProgram: string;
  avatarColor: string;
  interests: string[];
  focusAreas: string[];
};

export type CalendarEvent = {
  id: string;
  title: string;
  category: EventCategory;
  startsAt: string;
  endsAt?: string;
  location: string;
  childIds: string[];
};

export type LearningRecord = {
  id: string;
  childId: string;
  subject: string;
  title: string;
  date: string;
  durationMinutes: number;
  score?: number;
  confidence: number;
};

export type GoalStatus = "planned" | "in_progress" | "achieved" | "at_risk";

export type EducationGoal = {
  id: string;
  childId: string;
  title: string;
  subject: string;
  targetDate: string;
  status: GoalStatus;
  progress: number;
  milestones: {
    id: string;
    title: string;
    dueDate: string;
    completed: boolean;
  }[];
};

export type Resource = {
  id: string;
  childId?: string;
  kind: "file" | "note" | "link" | "worksheet" | "book" | "video";
  title: string;
  subject: string;
  tags: string[];
  updatedAt: string;
};

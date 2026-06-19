import type { CalendarEvent, Child, EducationGoal, LearningRecord, Resource } from "@/lib/types";

export const children: Child[] = [
  {
    id: "emma",
    firstName: "Emma",
    lastName: "Tanaka",
    age: 12,
    grade: "Grade 7",
    schoolName: "Aoyama International School",
    schoolProgram: "Middle Years Programme",
    avatarColor: "#0f766e",
    interests: ["Reading", "Robotics", "Piano"],
    focusAreas: ["Algebra fluency", "Essay structure"]
  },
  {
    id: "noah",
    firstName: "Noah",
    lastName: "Tanaka",
    age: 9,
    grade: "Grade 4",
    schoolName: "Aoyama International School",
    schoolProgram: "Primary Years Programme",
    avatarColor: "#2563eb",
    interests: ["Soccer", "Science", "Minecraft"],
    focusAreas: ["Multiplication speed", "Reading stamina"]
  },
  {
    id: "mia",
    firstName: "Mia",
    lastName: "Tanaka",
    age: 6,
    grade: "Grade 1",
    schoolName: "Aoyama International School",
    schoolProgram: "Early Primary",
    avatarColor: "#db2777",
    interests: ["Art", "Dance", "Animals"],
    focusAreas: ["Phonics", "Morning routine"]
  }
];

export const calendarEvents: CalendarEvent[] = [
  {
    id: "event-1",
    title: "Middle school assembly",
    category: "school",
    startsAt: "2026-06-22T09:00:00+09:00",
    endsAt: "2026-06-22T10:00:00+09:00",
    location: "School auditorium",
    childIds: ["emma"]
  },
  {
    id: "event-2",
    title: "Math tutoring",
    category: "tutoring",
    startsAt: "2026-06-22T16:30:00+09:00",
    endsAt: "2026-06-22T17:30:00+09:00",
    location: "Kumon Omotesando",
    childIds: ["emma", "noah"]
  },
  {
    id: "event-3",
    title: "Soccer practice",
    category: "activity",
    startsAt: "2026-06-23T17:00:00+09:00",
    endsAt: "2026-06-23T18:30:00+09:00",
    location: "Yoyogi Park field",
    childIds: ["noah"]
  },
  {
    id: "event-4",
    title: "Phonics check-in",
    category: "exam",
    startsAt: "2026-06-24T10:30:00+09:00",
    endsAt: "2026-06-24T11:00:00+09:00",
    location: "Grade 1 classroom",
    childIds: ["mia"]
  },
  {
    id: "event-5",
    title: "Family library hour",
    category: "family",
    startsAt: "2026-06-25T18:00:00+09:00",
    endsAt: "2026-06-25T19:00:00+09:00",
    location: "Home",
    childIds: ["emma", "noah", "mia"]
  }
];

export const learningRecords: LearningRecord[] = [
  {
    id: "lr-1",
    childId: "emma",
    subject: "Math",
    title: "Linear equations practice",
    date: "2026-06-18",
    durationMinutes: 45,
    score: 88,
    confidence: 4
  },
  {
    id: "lr-2",
    childId: "noah",
    subject: "Reading",
    title: "Chapter book reflection",
    date: "2026-06-18",
    durationMinutes: 30,
    score: 82,
    confidence: 3
  },
  {
    id: "lr-3",
    childId: "mia",
    subject: "Language",
    title: "Short vowel sounds",
    date: "2026-06-17",
    durationMinutes: 20,
    score: 91,
    confidence: 5
  },
  {
    id: "lr-4",
    childId: "emma",
    subject: "English",
    title: "Argument essay outline",
    date: "2026-06-16",
    durationMinutes: 40,
    score: 84,
    confidence: 4
  }
];

export const educationGoals: EducationGoal[] = [
  {
    id: "goal-1",
    childId: "emma",
    title: "Prepare for Grade 8 math placement",
    subject: "Math",
    targetDate: "2026-11-15",
    status: "in_progress",
    progress: 62,
    milestones: [
      { id: "m1", title: "Finish algebra diagnostic", dueDate: "2026-07-01", completed: true },
      { id: "m2", title: "Master linear equations", dueDate: "2026-08-15", completed: false },
      { id: "m3", title: "Mock placement test", dueDate: "2026-10-20", completed: false }
    ]
  },
  {
    id: "goal-2",
    childId: "noah",
    title: "Build independent reading habit",
    subject: "Reading",
    targetDate: "2026-09-30",
    status: "in_progress",
    progress: 48,
    milestones: [
      { id: "m4", title: "20 minutes nightly for two weeks", dueDate: "2026-07-10", completed: false },
      { id: "m5", title: "Complete three chapter books", dueDate: "2026-08-30", completed: false }
    ]
  },
  {
    id: "goal-3",
    childId: "mia",
    title: "Read CVC words with confidence",
    subject: "Language",
    targetDate: "2026-08-20",
    status: "planned",
    progress: 28,
    milestones: [
      { id: "m6", title: "Short vowel set A", dueDate: "2026-07-05", completed: true },
      { id: "m7", title: "Blend practice packet", dueDate: "2026-08-01", completed: false }
    ]
  }
];

export const resources: Resource[] = [
  {
    id: "res-1",
    childId: "emma",
    kind: "file",
    title: "Math placement rubric",
    subject: "Math",
    tags: ["exam", "rubric"],
    updatedAt: "2026-06-18"
  },
  {
    id: "res-2",
    childId: "noah",
    kind: "link",
    title: "Reading list: summer level 4",
    subject: "Reading",
    tags: ["books", "summer"],
    updatedAt: "2026-06-17"
  },
  {
    id: "res-3",
    childId: "mia",
    kind: "worksheet",
    title: "Phonics short vowel pack",
    subject: "Language",
    tags: ["phonics", "printable"],
    updatedAt: "2026-06-15"
  },
  {
    id: "res-4",
    kind: "note",
    title: "Family education planning notes",
    subject: "Planning",
    tags: ["roadmap", "parent"],
    updatedAt: "2026-06-14"
  }
];

export type Priority = "high" | "medium" | "low";
export type ProjectColor = "coral" | "blue" | "amber" | "teal";
export type DueLabel = "Today" | "Tomorrow" | "This week" | "Friday" | "Next week" | "Yesterday";

export interface Email {
  id: number;
  from: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
  priority: Priority;
  project: string | null;
}

export interface Message {
  id: number;
  from: string;
  text: string;
  time: string;
  unread: boolean;
  project: string | null;
}

export interface Task {
  id: number;
  title: string;
  done: boolean;
  priority: Priority;
  due: DueLabel;
}

export interface Project {
  id: number;
  name: string;
  color: ProjectColor;
  dueSoon: boolean;
  tasks: Task[];
}

export const emails: Email[] = [
  { id: 1, from: "Sarah Chen", subject: "Re: Q3 budget approval needed", preview: "Can you sign off on this by Friday? We're blocked otherwise...", time: "9:14 AM", unread: true, priority: "high", project: "Finance" },
  { id: 2, from: "GitHub", subject: "[repo] PR #482 needs your review", preview: "3 files changed, +120 -34. Requested review from you 2 days ago.", time: "8:02 AM", unread: true, priority: "medium", project: "Engineering" },
  { id: 3, from: "Marcus Webb", subject: "Lunch next week?", preview: "Been a while! Free Tuesday or Wednesday?", time: "Yesterday", unread: false, priority: "low", project: null },
  { id: 4, from: "Linear", subject: "5 issues assigned to you are overdue", preview: "ENG-341, ENG-355, ENG-360 and 2 more...", time: "Yesterday", unread: true, priority: "high", project: "Engineering" },
  { id: 5, from: "Client - Nova Inc", subject: "Contract revisions attached", preview: "Legal made a few changes to section 4.2, please review...", time: "Mon", unread: false, priority: "high", project: "Nova Contract" },
];

export const messages: Message[] = [
  { id: 1, from: "Priya (Slack)", text: "hey did you get a chance to look at the deck?", time: "10:32 AM", unread: true, project: "Nova Contract" },
  { id: 2, from: "Design team", text: "New mockups posted in #design-review", time: "9:50 AM", unread: true, project: "Engineering" },
  { id: 3, from: "Mom", text: "Call me when you get a sec", time: "8:15 AM", unread: false, project: null },
];

export const projects: Project[] = [
  {
    id: 1, name: "Nova Contract", color: "coral", dueSoon: true,
    tasks: [
      { id: 1, title: "Review contract section 4.2 changes", done: false, priority: "high", due: "Today" },
      { id: 2, title: "Reply to Priya about the deck", done: false, priority: "high", due: "Today" },
      { id: 3, title: "Schedule signing call", done: false, priority: "medium", due: "Tomorrow" },
    ],
  },
  {
    id: 2, name: "Engineering", color: "blue", dueSoon: true,
    tasks: [
      { id: 4, title: "Review PR #482", done: false, priority: "medium", due: "Today" },
      { id: 5, title: "Triage 5 overdue Linear issues", done: false, priority: "high", due: "Today" },
      { id: 6, title: "Comment on design mockups", done: false, priority: "low", due: "This week" },
      { id: 7, title: "Update sprint board", done: true, priority: "low", due: "Yesterday" },
    ],
  },
  {
    id: 3, name: "Finance", color: "amber", dueSoon: true,
    tasks: [
      { id: 8, title: "Sign off on Q3 budget", done: false, priority: "high", due: "Friday" },
    ],
  },
  {
    id: 4, name: "Personal", color: "teal", dueSoon: false,
    tasks: [
      { id: 9, title: "Call mom back", done: false, priority: "medium", due: "Today" },
      { id: 10, title: "Plan lunch with Marcus", done: false, priority: "low", due: "Next week" },
    ],
  },
];

export const colorMap: Record<ProjectColor, { bg: string; text: string; border: string; dot: string }> = {
  coral: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", dot: "bg-orange-500" },
  blue: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", dot: "bg-blue-500" },
  amber: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-500" },
  teal: { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200", dot: "bg-teal-500" },
};

export const priorityStyle: Record<Priority, string> = {
  high: "text-red-600 bg-red-50",
  medium: "text-amber-600 bg-amber-50",
  low: "text-gray-500 bg-gray-100",
};

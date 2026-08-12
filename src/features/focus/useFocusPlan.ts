import { useMemo } from "react";
import { projects, type Task, type ProjectColor, type DueLabel } from "@/data/mockData";

export interface FocusTask extends Task {
  project: string;
  color: ProjectColor;
}

const PRIORITY_ORDER: Record<Task["priority"], number> = { high: 0, medium: 1, low: 2 };
const DUE_ORDER: Record<DueLabel, number> = {
  Today: 0,
  Tomorrow: 1,
  "This week": 2,
  Friday: 2,
  "Next week": 3,
  Yesterday: -1,
};

export function useFocusPlan(): FocusTask[] {
  return useMemo(() => {
    const allTasks: FocusTask[] = projects.flatMap((p) =>
      p.tasks
        .filter((t) => !t.done)
        .map((t) => ({ ...t, project: p.name, color: p.color }))
    );
    return allTasks.sort(
      (a, b) => DUE_ORDER[a.due] - DUE_ORDER[b.due] || PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
    );
  }, []);
}

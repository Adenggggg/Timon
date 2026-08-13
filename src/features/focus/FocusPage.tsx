import { Mail, MessageSquare } from "lucide-react";
import { useFocusPlan } from "./useFocusPlan";
import { emails, messages, projects, priorityStyle } from "@/data/mockData";
import { useAuth } from "@/features/auth/AuthContext";

const priorityLabel: Record<string, string> = { high: "High", medium: "Med", low: "Low" };

export default function FocusPage() {
  const { user } = useAuth();
  const plan = useFocusPlan();
  const top3 = plan.slice(0, 3);
  const rest = plan.slice(3);

  const allTasks = projects.flatMap((p) => p.tasks);
  const doneCount = allTasks.filter((t) => t.done).length;
  const totalCount = allTasks.length;
  const percentDone = totalCount ? Math.round((doneCount / totalCount) * 100) : 0;
  const tasksLeft = totalCount - doneCount;
  const firstName = user?.name?.split(" ")[0] ?? "there";

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
      <div className="flex-1 min-w-0 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Good morning, {firstName}</h1>
          <p className="text-gray-500 mt-1">Here's what deserves your attention today.</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 pb-2 border-b border-gray-200">
            Do these first
          </h2>
          <div className="space-y-3">
            {top3.map((t, i) => (
              <div
                key={t.id}
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white shadow-sm"
              >
                <span className="text-xs font-semibold text-gray-300 w-6 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{t.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {t.project} · <span className="text-red-500">Due {t.due}</span>
                  </p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${priorityStyle[t.priority]}`}>
                  {priorityLabel[t.priority]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 pb-2 border-b border-gray-200">
            Then this
          </h2>
          <div className="space-y-3">
            {rest.map((t, i) => (
              <div
                key={t.id}
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white shadow-sm"
              >
                <span className="text-xs font-semibold text-gray-300 w-6 shrink-0">
                  {String(i + 4).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{t.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{t.project} · {t.due}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${priorityStyle[t.priority]}`}>
                  {priorityLabel[t.priority]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-64 shrink-0 space-y-4">
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
          <div className="rounded-xl bg-gray-900 text-white p-5 flex items-center gap-4">
            <Mail size={20} className="shrink-0" />
            <div className="min-w-0">
              <p className="text-2xl font-semibold leading-none">{emails.filter((e) => e.unread).length}</p>
              <p className="text-xs text-gray-300 mt-1 truncate">Unread email</p>
            </div>
          </div>

          <div className="rounded-xl bg-gray-100 text-gray-900 p-5 flex items-center gap-4">
            <MessageSquare size={20} className="text-gray-500 shrink-0" />
            <div className="min-w-0">
              <p className="text-2xl font-semibold leading-none">{messages.filter((m) => m.unread).length}</p>
              <p className="text-xs text-gray-500 mt-1 truncate">Unread messages</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Daily progress</p>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-gray-900 rounded-full" style={{ width: `${percentDone}%` }} />
          </div>
          <p className="text-xs text-gray-400">
            {percentDone}% complete · {tasksLeft} task{tasksLeft === 1 ? "" : "s"} left
          </p>
        </div>
      </div>
    </div>
  );
}

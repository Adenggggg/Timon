import { Circle, Mail, MessageSquare } from "lucide-react";
import { useFocusPlan } from "./useFocusPlan";
import { emails, messages, colorMap, priorityStyle } from "@/data/mockData";

export default function FocusPage() {
  const plan = useFocusPlan();
  const top3 = plan.slice(0, 3);
  const rest = plan.slice(3);

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Good morning</h1>
        <p className="text-gray-500 mt-1">Here's what deserves your attention today.</p>
      </div>

      <div className="mb-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Do these first</h2>
        <div className="space-y-2">
          {top3.map((t, i) => {
            const c = colorMap[t.color];
            return (
              <div key={t.id} className={`flex items-center gap-3 p-4 rounded-xl border ${c.border} ${c.bg}`}>
                <span className="text-lg font-semibold text-gray-400 w-5">{i + 1}</span>
                <Circle size={18} className="text-gray-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{t.title}</p>
                  <p className={`text-xs ${c.text}`}>{t.project} · Due {t.due}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${priorityStyle[t.priority]}`}>
                  {t.priority}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-3">
        <div className="p-4 rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
            <Mail size={15} /> Unread email
          </div>
          <p className="text-2xl font-semibold text-gray-900">{emails.filter((e) => e.unread).length}</p>
        </div>
        <div className="p-4 rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
            <MessageSquare size={15} /> Unread messages
          </div>
          <p className="text-2xl font-semibold text-gray-900">{messages.filter((m) => m.unread).length}</p>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Then this</h2>
        <div className="space-y-1.5">
          {rest.map((t) => {
            const c = colorMap[t.color];
            return (
              <div key={t.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50">
                <Circle size={16} className="text-gray-300 shrink-0" />
                <span className={`w-1.5 h-1.5 rounded-full ${c.dot} shrink-0`} />
                <p className="flex-1 text-sm text-gray-700 truncate">{t.title}</p>
                <span className="text-xs text-gray-400">{t.due}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

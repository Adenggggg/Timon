import { useState } from "react";
import { ChevronRight, CheckCircle2, Circle, Clock } from "lucide-react";
import { projects, colorMap, priorityStyle } from "@/data/mockData";

export default function ProjectsPage() {
  const [open, setOpen] = useState<number[]>(projects.map((p) => p.id));
  const toggle = (id: number) =>
    setOpen((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Projects</h1>
      <div className="space-y-4">
        {projects.map((p) => {
          const c = colorMap[p.color];
          const isOpen = open.includes(p.id);
          const doneCount = p.tasks.filter((t) => t.done).length;
          return (
            <div key={p.id} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggle(p.id)}
                className="w-full flex items-center gap-3 p-4 bg-white hover:bg-gray-50"
              >
                <span className={`w-2.5 h-2.5 rounded-full ${c.dot}`} />
                <span className="font-medium text-gray-900 flex-1 text-left">{p.name}</span>
                <span className="text-xs text-gray-400">{doneCount}/{p.tasks.length} done</span>
                <ChevronRight size={16} className={`text-gray-400 transition-transform ${isOpen ? "rotate-90" : ""}`} />
              </button>
              {isOpen && (
                <div className="border-t border-gray-100">
                  {p.tasks.map((t) => (
                    <div key={t.id} className="flex items-center gap-3 px-4 py-2.5 border-b last:border-b-0 border-gray-50">
                      {t.done ? (
                        <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                      ) : (
                        <Circle size={16} className="text-gray-300 shrink-0" />
                      )}
                      <p className={`flex-1 text-sm ${t.done ? "line-through text-gray-400" : "text-gray-700"}`}>{t.title}</p>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock size={11} /> {t.due}
                      </span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${priorityStyle[t.priority]}`}>
                        {t.priority}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

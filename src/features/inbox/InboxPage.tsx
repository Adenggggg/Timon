import { AlertCircle, Search } from "lucide-react";
import { emails } from "@/data/mockData";

export default function InboxPage() {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Inbox</h1>
        <div className="flex items-center gap-2 text-sm text-gray-400 border border-gray-200 rounded-lg px-3 py-1.5">
          <Search size={14} /> Search
        </div>
      </div>
      <div className="space-y-1">
        {emails.map((e) => (
          <div key={e.id} className={`flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 border-b border-gray-100 ${e.unread ? "" : "opacity-60"}`}>
            <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${e.unread ? "bg-blue-500" : "bg-transparent"}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className={`text-sm truncate ${e.unread ? "font-semibold text-gray-900" : "font-medium text-gray-600"}`}>{e.from}</p>
                <span className="text-xs text-gray-400 shrink-0">{e.time}</span>
              </div>
              <p className={`text-sm truncate ${e.unread ? "text-gray-800" : "text-gray-500"}`}>{e.subject}</p>
              <p className="text-xs text-gray-400 truncate">{e.preview}</p>
              {e.project && (
                <span className="inline-block mt-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{e.project}</span>
              )}
            </div>
            {e.priority === "high" && <AlertCircle size={15} className="text-red-500 shrink-0 mt-1" />}
          </div>
        ))}
      </div>
    </div>
  );
}

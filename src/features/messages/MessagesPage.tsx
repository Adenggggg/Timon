import { messages } from "@/data/mockData";

export default function MessagesPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Messages</h1>
      <div className="space-y-1">
        {messages.map((m) => (
          <div key={m.id} className={`flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 border-b border-gray-100 ${m.unread ? "" : "opacity-60"}`}>
            <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${m.unread ? "bg-blue-500" : "bg-transparent"}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className={`text-sm truncate ${m.unread ? "font-semibold text-gray-900" : "font-medium text-gray-600"}`}>{m.from}</p>
                <span className="text-xs text-gray-400 shrink-0">{m.time}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{m.text}</p>
              {m.project && (
                <span className="inline-block mt-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{m.project}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

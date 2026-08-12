import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppShell from "@/layouts/AppShell";
import FocusPage from "@/features/focus/FocusPage";
import InboxPage from "@/features/inbox/InboxPage";
import MessagesPage from "@/features/messages/MessagesPage";
import ProjectsPage from "@/features/projects/ProjectsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<FocusPage />} />
          <Route path="inbox" element={<InboxPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="projects" element={<ProjectsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

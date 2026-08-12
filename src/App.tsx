import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/features/auth/AuthContext";
import RequireAuth from "@/features/auth/RequireAuth";
import LoginPage from "@/features/auth/LoginPage";
import RegisterPage from "@/features/auth/RegisterPage";
import AppShell from "@/layouts/AppShell";
import FocusPage from "@/features/focus/FocusPage";
import InboxPage from "@/features/inbox/InboxPage";
import MessagesPage from "@/features/messages/MessagesPage";
import ProjectsPage from "@/features/projects/ProjectsPage";
import SettingsPage from "@/features/settings/SettingsPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            element={
              <RequireAuth>
                <AppShell />
              </RequireAuth>
            }
          >
            <Route index element={<FocusPage />} />
            <Route path="inbox" element={<InboxPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

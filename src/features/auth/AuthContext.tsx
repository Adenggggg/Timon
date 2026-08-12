import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface StoredAccount extends User {
  password: string;
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const ACCOUNTS_KEY = "timon.accounts";
const SESSION_KEY = "timon.session";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function readAccounts(): StoredAccount[] {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    return raw ? (JSON.parse(raw) as StoredAccount[]) : [];
  } catch {
    return [];
  }
}

function writeAccounts(accounts: StoredAccount[]) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

// Seed a demo account so the login screen is usable immediately.
function ensureSeedAccount() {
  const accounts = readAccounts();
  if (accounts.length === 0) {
    writeAccounts([
      {
        id: "seed-1",
        name: "Alex Rivet",
        email: "alex@timon.app",
        password: "password",
        role: "Pro Member",
      },
    ]);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ensureSeedAccount();
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) setUser(JSON.parse(raw) as User);
    } catch {
      // ignore corrupt session
    }
    setIsLoading(false);
  }, []);

  async function login(email: string, password: string) {
    await new Promise((r) => setTimeout(r, 400)); // simulate network
    const accounts = readAccounts();
    const match = accounts.find(
      (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password
    );
    if (!match) {
      throw new Error("Invalid email or password.");
    }
    const { password: _pw, ...publicUser } = match;
    setUser(publicUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(publicUser));
  }

  async function register(name: string, email: string, password: string) {
    await new Promise((r) => setTimeout(r, 400));
    const accounts = readAccounts();
    if (accounts.some((a) => a.email.toLowerCase() === email.trim().toLowerCase())) {
      throw new Error("An account with that email already exists.");
    }
    const newAccount: StoredAccount = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
      password,
      role: "New Member",
    };
    writeAccounts([...accounts, newAccount]);
    const { password: _pw, ...publicUser } = newAccount;
    setUser(publicUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(publicUser));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

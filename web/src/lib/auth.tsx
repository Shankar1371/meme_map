import { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  handle: string;
  email?: string;
}

const AuthCtx = createContext<{ user: User | null; signIn: () => void; signOut: () => void }>({
  user: null,
  signIn: () => {},
  signOut: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const signIn = () => setUser({ id: 'dev', handle: 'dev' }); // TODO: integrate Firebase
  const signOut = () => setUser(null);
  return <AuthCtx.Provider value={{ user, signIn, signOut }}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  return useContext(AuthCtx);
}

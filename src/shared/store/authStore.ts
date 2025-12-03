import { create } from 'zustand';

type Mode = 'login' | 'signup';
type Role = 'admin' | 'organizer' | 'filmmaker';

type SignInInput = {
  mode: Mode;
  email: string;
  password: string;
  signupRole?: 'filmmaker' | 'organizer';
};

type AuthState = {
  role: Role | null;
  userEmail: string | null;
  signIn: (input: SignInInput) => Promise<Role>;
  signOut: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  role: null,
  userEmail: null,

  signIn: async ({ mode, email, password, signupRole }) => {
    await new Promise((r) => setTimeout(r, 300));

    if (!email || !password) throw new Error('Email and password are required.');

    let assigned: Role;

    if (mode === 'login') {
      const em = email.toLowerCase();
      if (em === 'admin@filmly.dev') {
        assigned = 'admin';
      } else if (em === 'organizer@test.org' || em.startsWith('organizer+org@')) {
        assigned = 'organizer';
      } else {
        assigned = 'filmmaker';
      }
    } else {
      assigned = signupRole === 'organizer' ? 'organizer' : 'filmmaker'; // admin cannot be self-assigned
    }

    set({ role: assigned, userEmail: email });
    return assigned;
  },

  signOut: () => set({ role: null, userEmail: null }),
}));
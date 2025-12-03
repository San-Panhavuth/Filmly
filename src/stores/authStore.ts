// Simple mock auth store using Zustand
import { create } from 'zustand';

type SignInInput = {
  mode: 'login' | 'signup';
  email: string;
  password: string;
  signupRole?: 'filmmaker' | 'organizer';
};

type Role = 'admin' | 'organizer' | 'filmmaker';

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
    // Simulate latency
    await new Promise((r) => setTimeout(r, 400));

    // Basic password presence check
    if (!email || !password) {
      throw new Error('Email and password are required.');
    }

    let assigned: Role;

    if (mode === 'login') {
      if (email.toLowerCase() === 'admin@filmly.dev') {
        assigned = 'admin';
      } else if (
        email.toLowerCase() === 'organizer@test.org' ||
        email.toLowerCase().startsWith('organizer+org@')
      ) {
        assigned = 'organizer';
      } else {
        assigned = 'filmmaker';
      }
    } else {
      // signup cannot self-assign admin
      assigned = signupRole === 'organizer' ? 'organizer' : 'filmmaker';
    }

    set({ role: assigned, userEmail: email });
    return assigned;
  },

  signOut: () => set({ role: null, userEmail: null }),
}));
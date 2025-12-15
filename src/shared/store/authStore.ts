import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  id: string;
  email: string;
  name?: string;
  email_verified?: boolean;
  created_at?: string;
  updated_at?: string;
} | null;

type AuthState = {
  user: User;
  userEmail: string | null;
  roles: string[];
  activeRole: string | null;
  isAuthenticated: boolean;
  setUser: (email: string, roles: string[], activeRole?: string, user?: User) => void;
  setActiveRole: (role: string) => void;
  signOut: () => void;
  checkAuth: () => boolean;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      userEmail: null,
      roles: [],
      activeRole: null,
      isAuthenticated: false,
      
      setUser: (email, roles, activeRole, user) => set({ 
        userEmail: email, 
        user: user || null,
        roles, 
        activeRole: activeRole ?? roles[0] ?? null,
        isAuthenticated: true
      }),
      
      setActiveRole: (role) => set((state) => ({ 
        activeRole: role, 
        roles: state.roles.includes(role) ? state.roles : [...state.roles, role] 
      })),
      
      signOut: () => {
        // Clear localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
        }
        set({ userEmail: null, user: null, roles: [], activeRole: null, isAuthenticated: false });
      },
      
      checkAuth: () => {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('access_token');
          const isAuth = !!token;
          if (get().isAuthenticated !== isAuth) {
            set({ isAuthenticated: isAuth });
          }
          return isAuth;
        }
        return false;
      }
    }),
    {
      name: 'filmly-auth-storage',
      storage: {
        getItem: (name) => {
          if (typeof window === 'undefined') return null;
          const value = localStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          if (typeof window === 'undefined') return;
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          if (typeof window === 'undefined') return;
          localStorage.removeItem(name);
        },
      },
      partialize: (state) => ({ 
        userEmail: state.userEmail,
        user: state.user,
        roles: state.roles,
        activeRole: state.activeRole,
        isAuthenticated: state.isAuthenticated
      }) as AuthState,
    }
  )
);
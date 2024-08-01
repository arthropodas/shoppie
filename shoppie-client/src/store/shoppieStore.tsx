// src/store/shoppieStore.tsx

import { create } from 'zustand';

interface LoginState {
  isLoggedIn: boolean;
  cust_id: string;
  login: () => void;
  logout: () => void;
  setCustId: (id: string) => void;
}

export const useShoppieStore = create<LoginState>((set) => ({
  isLoggedIn: false,
  cust_id: '',
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
  setCustId: (id: string) => set({ cust_id: id }),
}));

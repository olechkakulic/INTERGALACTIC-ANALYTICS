import { create } from "zustand";

const useHistoryStore = create((set) => ({
  requests: JSON.parse(localStorage.getItem("csvHistory")) || [],

  addRequest: (request) =>
    set((state) => {
      const updatedRequests = [request, ...state.requests.slice(0, 9)];
      localStorage.setItem("csvHistory", JSON.stringify(updatedRequests));
      return { requests: updatedRequests };
    }),

  removeRequest: (id) =>
    set((state) => {
      const updatedRequests = state.requests.filter((req) => req.id !== id);
      localStorage.setItem("csvHistory", JSON.stringify(updatedRequests));
      return { requests: updatedRequests };
    }),

  clearHistory: () => {
    localStorage.removeItem("csvHistory");
    set({ requests: [] });
  },
}));

export default useHistoryStore;

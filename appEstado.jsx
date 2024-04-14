import { create } from "zustand";
import { persist } from "zustand/middleware";

let appEstado = (set) => ({
  dopen: true,
  updateOpen: (dopen) => set((state) => ({ dopen: dopen })),
});

appEstado = persist(appEstado, { name: "my_app_store" });
export const useAppEstado = create(appEstado);

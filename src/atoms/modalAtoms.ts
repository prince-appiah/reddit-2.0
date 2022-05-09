import { atom } from "recoil";

export interface IAuthModalState {
  open: boolean;
  view: "login" | "signup" | "resetPassword";
}

export const authModalState = atom<IAuthModalState>({
  key: "authModalState",
  default: { open: false, view: "login" },
});

import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// export const tokenAtom = atomWithStorage<string | undefined>("gjwt", undefined);

export type User = {
  username: string;
  uuid: string;
  profile_image: string;
  status: string;
  isAuth: boolean;
};

const tokenAtom = atom(localStorage.getItem("gjwt") ?? null);

export const tokenAtomWithPersistence = atom(
  (get) => get(tokenAtom),
  (_get, set, newStr: string) => {
    set(tokenAtom, newStr);
    localStorage.setItem("gjwt", newStr);
  }
);

export const userAtom = atomWithStorage<User | undefined>("user", undefined);

export const playersInRoom = atom<User[] | null>(null);

export const roomIdAtom = atom<string | null>(null);

export const joinedRoomIdAtom = atom<string | null>(null);

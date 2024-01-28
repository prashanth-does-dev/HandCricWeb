import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const playerAtom = atomWithStorage<string | null>("player", null);

export const playersInRoom = atom<string[] | null>(null)

export const roomIdAtom = atom<string | null>(null);


export const joinedRoomIdAtom = atom<string | null>(null);
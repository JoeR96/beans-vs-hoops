import { create } from "zustand";
import {createBoundedVoteSlice} from "@/state/HeinzVoteSlice";

export const useBoundedHeinzStore = 
    create<HeinzBoundedStore>((set, get, api ) => ({
        ...createBoundedVoteSlice(set,  get, api)
    }));

type HeinzBoundedStore = ReturnType<typeof createBoundedVoteSlice>;
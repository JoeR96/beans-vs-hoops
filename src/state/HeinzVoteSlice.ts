import {StateCreator} from "zustand";

export interface HeinzVoteSlice {
    hoops: number;
    beans: number;
    hasVoted: boolean;
    setHasVoted: (hasVoted: boolean) => void;
    setHoopsAndBeans: (voteResponse: VoteResponse) => void;
}

export const createBoundedVoteSlice: StateCreator<
    HeinzVoteSlice,
    [],
    [], 
    HeinzVoteSlice
> = (set) => ({
    hoops: 0,
    beans: 0,
    setHoopsAndBeans: (voteResponse: VoteResponse) => set((state) => ({
        hoops: voteResponse.hoops ?? state.hoops,
        beans: voteResponse.beans ?? state.beans,
    })),
    hasVoted: false,
    setHasVoted: (hasVoted) => set({ hasVoted }),
});
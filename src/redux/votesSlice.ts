import { createSlice } from "@reduxjs/toolkit";

interface VoteState {
  spaghettiHoops: number;
  bakedBeans: number;
  lastVote: number | null;
}

const initialState: VoteState = {
  spaghettiHoops: 0,
  bakedBeans: 0,
  lastVote: null,
};

const votesSlice = createSlice({
  name: "votes",
  initialState,
  reducers: {
    voteSpaghettiHoops: (state) => {
      state.spaghettiHoops++; 
      state.lastVote = Date.now();
    },
    voteBakedBeans: (state) => {
      state.bakedBeans++;
      state.lastVote = Date.now();
    },
    updateVoteCount: (state, action) => {
      state.spaghettiHoops = action.payload.hoops;
      state.bakedBeans = action.payload.beans;
    }
  },
});

export const { voteSpaghettiHoops, voteBakedBeans, updateVoteCount } = votesSlice.actions;
export default votesSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  name: 'votes',
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
  },
});

export const { voteSpaghettiHoops, voteBakedBeans } = votesSlice.actions;

export default votesSlice.reducer;

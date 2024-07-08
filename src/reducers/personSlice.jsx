import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

export const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    loadperson: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.info = action.payload;
    },
    removeperson: (state) => {
      state.info = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadperson, removeperson } = personSlice.actions;

export default personSlice.reducer;

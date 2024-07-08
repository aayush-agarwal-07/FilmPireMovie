import { configureStore } from "@reduxjs/toolkit";
import personReducer from "./reducers/personSlice";
import tvReducer from "./reducers/tvSlice";
import movieReducer from "./reducers/movieSlice";
export const store = configureStore({
  reducer: {
    movie: movieReducer,
    tv: tvReducer,
    person: personReducer,
  },
});

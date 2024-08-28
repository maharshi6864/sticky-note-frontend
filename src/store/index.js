import { configureStore } from "@reduxjs/toolkit";
import stickyNotesStore from "./stickyNotesStore";
import userDetailsSlice from "./userDetails";

const store = configureStore({
  reducer: {
    stickyNotesStore: stickyNotesStore.reducer,
    userDetails: userDetailsSlice.reducer,
  },
});

export default store;

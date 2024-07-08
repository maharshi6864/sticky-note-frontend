import { configureStore } from "@reduxjs/toolkit";
import stickyNotesStore from "./stickyNotesStore";


const store = configureStore({
  reducer: { stickyNotesStore: stickyNotesStore.reducer }
})

export default store;
import { createSlice } from "@reduxjs/toolkit";
// { id: 1, title: "Complete this react project today", position: { x: "150px", y: "100px" },color:"#fec325" }
const stickyNotesStore = createSlice({
  name: "stickyNotesStore",
  initialState: { notes: [], idCount: 100 },
  reducers: {
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload.id);
      console.log(state.notes);
      return state;
    },
    createNewNote: (state, action) => {
      action.payload.id = state.idCount;
      state.idCount++;
      state.notes.push(action.payload);
      return state;
    },
    loadNotes: (state, action) => {
      state.notes = [...action.payload];
      return state;
    },
    updateNotePostion: (state, action) => {
      state.notes.forEach((note) => {
        if (note.id === action.payload.id) {
          note.positionX = action.payload.positionX;
          note.positionY = action.payload.positionY;
        }
      });
    },
  },
});

export default stickyNotesStore;

export const stickyNotesAction = stickyNotesStore.actions;

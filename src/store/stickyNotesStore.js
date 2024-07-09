import { createSlice } from "@reduxjs/toolkit";



const stickyNotesStore = createSlice({
  name: "stickyNotesStore", initialState: { notes: [{ id: 1, title: "Complete this react project today", position: { x: "150px", y: "100px" },color:"black" }], idCount: 100 }, reducers: {
    deleteNote: (state, action) => {
      //Write the logic to delete the note 
      console.log(action.payload.id, "Deleting the note");
      state.notes.push({ id: 2, title: "Hello this is new thing", position: { x: "320px", y: "230px" } });
      return state;
    },
    createNewNote: (state, action) => {
      action.payload.id = state.idCount;
      state.idCount++;
      state.notes.push(action.payload);
      return state;
    }
  }
});

export default stickyNotesStore;

export const stickyNotesAction = stickyNotesStore.actions;
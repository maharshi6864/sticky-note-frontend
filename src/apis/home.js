import { GLOBAL_URL } from "./globalUrl";

export const loadNotesFrom = async () => {
  const response = await fetch(GLOBAL_URL + "stickyNote/loadNotes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return response.json();
};

export const saveNewNote = async (note) => {
  const response = await fetch(GLOBAL_URL + "stickyNote/saveNote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const deleteNote = async (note) => {
  const response = await fetch(GLOBAL_URL + "stickyNote/deleteNote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const changeNotePosition = async (note) => {
  const response = await fetch(GLOBAL_URL + "stickyNote/updateNotePosition", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

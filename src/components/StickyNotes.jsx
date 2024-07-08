import { useDispatch, useSelector } from "react-redux";
import StickyNote from "./StickyNote";
import { createRef, useRef } from "react";

const StickyNotes = () => {
  const { notes } = useSelector((store) => store.stickyNotesStore);

  const dispatch = useDispatch();

  const notesRef = useRef([]);

  const handleDragStart = (note, e) => {
    const noteRef = notesRef.current[note.id].current;
    const rect = noteRef.getBoundingClientRect();
    const offSetX = e.clientX - rect.left;
    const offSetY = e.clientY - rect.top;
    const startPos = note.position;

    const handleMouseMove = (e) => {
      const newX = e.clientX - offSetX;
      const newY = e.clientY - offSetY;

      noteRef.style.left = `${newX}px`;
      noteRef.style.top = `${newY}px`;
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      const finalPosition = noteRef.getBoundingClientRect();
      const newPostion = { x: finalPosition.left, y: finalPosition.top };

      if (checkForOverLap(note.id)) {
        noteRef.style.left = `${startPos.x}px`;
        noteRef.style.top = `${startPos.y}px`;
      } else {
        updateNotePostion(note.id, newPostion);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const checkForOverLap = (id) => {
    const currentNoteRef = notesRef.current[id].current;
    const currentRect = currentNoteRef.getBoundingClientRect();
    return notes.some((note) => {
      if (note.id === id) return false;

      const otherNoteRef = notesRef.current[note.id].current;
      const otherRect = otherNoteRef.getBoundingClientRect();

      const overlap = !(
        currentRect.right < otherRect.left ||
        currentRect.left > otherRect.right ||
        currentRect.top > otherRect.bottom ||
        currentRect.bottom < otherRect.top
      );
      return overlap;
    });
  };

  const updateNotePostion = (id, postion) => {
    //To do create a method to update the postion of the note in
    // redux.
  };

  return (
    <div>
      {notes.map((note) => (
        <StickyNote
          key={note.id}
          ref={
            notesRef.current[note]
              ? notesRef.current[note.id]
              : (notesRef.current[note.id] = createRef())
          }
          note={note}
          onMouseDown={(e) => {
            handleDragStart(note, e);
          }}
        ></StickyNote>
      ))}
    </div>
  );
};

export default StickyNotes;

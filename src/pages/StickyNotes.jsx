import { useDispatch, useSelector } from "react-redux";
import StickyNote from "../components/StickyNote";
import { createRef, useRef } from "react";
import { stickyNotesAction } from "../store/stickyNotesStore";
import { changeNotePosition } from "../apis/home";

const StickyNotes = () => {
  const { notes } = useSelector((store) => store.stickyNotesStore);

  const dispatch = useDispatch();

  const notesRef = useRef([]);

  const handleDragStart = (note, e) => {
    const noteRef = notesRef.current[note.id].current;
    const rect = noteRef.getBoundingClientRect();
    const offSetX = e.clientX - rect.left;
    const offSetY = e.clientY - rect.top;
    const startPosX = note.positionX;
    const startPosY = note.positionY;

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
      const newPostionX = finalPosition.left;
      const newPostionY = finalPosition.top;

      if (checkForOverLap(note.id)) {
        noteRef.style.left = `${startPosX}px`;
        noteRef.style.top = `${startPosY}px`;
      } else {
        updateNotePostion(note.id, { newPostionX, newPostionY });
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

  const updateNotePostion = (id, position) => {
    changeNotePosition({
      id: parseInt(id),
      positionX: position.newPostionX,
      positionY: position.newPostionY,
    });
    dispatch(
      stickyNotesAction.updateNotePostion({
        id,
        positionX: position.x,
        positionY: position.y,
      })
    );
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

import { MdDeleteOutline } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import style from "../css/StickyNote.module.css";
import { useDispatch } from "react-redux";
import { stickyNotesAction } from "../store/stickyNotesStore";
import { forwardRef } from "react";
import { deleteNote } from "../apis/home";

const StickyNote = forwardRef((props, ref) => {
  const dispatch = useDispatch();

  const handleNoteDelete = (id) => {
    deleteNote({ id });
    dispatch(stickyNotesAction.deleteNote({ id }));
  };

  return (
    <div
      ref={ref}
      style={{
        top: `${props.note.positionY}px`,
        left: `${props.note.positionX}px`,
        backgroundColor: `${props.note.bgColor}`,
      }}
      className={`${style.stickyNote}`}
    >
      <div style={{ width: "18rem" }}>
        <div className={`${style.stickyNoteHead}`}>
          <span
            className={`${style.moveIcon}`}
            style={{}}
            onMouseDown={props.onMouseDown}
          >
            <IoMenu />
          </span>
          <span
            className={`${style.deleteIcon}`}
            onClick={() => {
              handleNoteDelete(props.note.id);
            }}
          >
            <MdDeleteOutline />
          </span>
        </div>
        <div className={`${style.stickyNoteBody}`}>
          <p className="card-text">{props.note.title}</p>
        </div>
      </div>
    </div>
  );
});

export default StickyNote;

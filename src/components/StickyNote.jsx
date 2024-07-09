import { MdDeleteOutline } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import style from "../css/StickyNote.module.css";
import { useDispatch } from "react-redux";
import { stickyNotesAction } from "../store/stickyNotesStore";
import { forwardRef } from "react";

const StickyNote = forwardRef((props, ref) => {
  const dispatch = useDispatch();

  const handleNoteDelete = (id) => {
    dispatch(stickyNotesAction.deleteNote({ id }));
  };

  return (
    <div
      ref={ref}
      style={{
        top: `${props.note.position.y}px`,
        left: `${props.note.position.x}px`,
        backgroundColor: `${props.note.color}`,
      }}
      className={`${style.stickyNote}`}
    >
      <div style={{ width: "18rem" }}>
        <div className={`${style.stickyNoteHead}`}>
          <span
            className={`${style.moveIcon}`}
            style={{ mixBlendMode: "difference" }}
            onMouseDown={props.onMouseDown}
          >
            <IoMenu />
          </span>
          <span
            className={`${style.deleteIcon}`}
            style={{ mixBlendMode: "difference" }}
            onClick={() => {
              handleNoteDelete(props.note.id);
            }}
          >
            <MdDeleteOutline />
          </span>
        </div>
        <div
          className={`${style.stickyNoteBody}`}
          style={{ mixBlendMode: "difference" }}
        >
          <p className="card-text">{props.note.title}</p>
        </div>
      </div>
    </div>
  );
});

export default StickyNote;

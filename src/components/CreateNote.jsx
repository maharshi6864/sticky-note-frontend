import { useRef, useState } from "react";
import styles from "../css/CreateNote.module.css";
import { useDispatch } from "react-redux";
import { stickyNotesAction } from "../store/stickyNotesStore";
import { saveNewNote } from "../apis/home";

const CreateNote = () => {
  const dispatch = useDispatch();
  const [backgroundColor, setBackGroundColor] = useState("#8cc63e");

  const generateRandomPostion = () => {
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 10;
    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    };
  };

  const noteDes = useRef();

  const createNewNote = async () => {
    let postionObj = generateRandomPostion();
    console.log(postionObj);
    let newNote = {
      title: noteDes.current.value,
      positionX: postionObj.x,
      positionY: postionObj.y,
      bgColor: backgroundColor,
    };
    const response = await saveNewNote(newNote);
    dispatch(stickyNotesAction.createNewNote(newNote));
  };
  return (
    <div className={styles.container}>
      <input
        type="text"
        name=""
        id=""
        placeholder="Add Your tasks"
        className={styles.inputForm}
        ref={noteDes}
      />
      <div
        className={styles.colorOption}
        style={{ backgroundColor: "#8cc63e" }}
        onClick={() => {
          setBackGroundColor("#8cc63e");
        }}
      ></div>
      <div
        className={styles.colorOption}
        style={{ backgroundColor: "#008fc4" }}
        onClick={() => {
          setBackGroundColor("#008fc4");
        }}
      ></div>
      <div
        className={styles.colorOption}
        style={{ backgroundColor: "#e32d41" }}
        onClick={() => {
          setBackGroundColor("#e32d41");
        }}
      ></div>
      <div
        className={styles.colorOption}
        style={{ backgroundColor: "#fec325" }}
        onClick={() => {
          setBackGroundColor("#fec325");
        }}
      ></div>
      <button
        className="btn btn-primary"
        onClick={() => {
          createNewNote();
        }}
      >
        Add
      </button>
    </div>
  );
};

export default CreateNote;

import { useRef } from "react";
import styles from "../css/CreateNote.module.css"
import { useDispatch } from "react-redux";
import { stickyNotesAction } from "../store/stickyNotesStore";

const CreateNote = () => {

  const dispatch = useDispatch();

  const generateRandomPostion = () => {
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 10;
    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY)
    }
  }

  const noteDes = useRef();

  const createNewNote = () => {
    let postionObj = generateRandomPostion();
    console.log(postionObj);
    let newNote = { title: noteDes.current.value, position: postionObj };
    dispatch(stickyNotesAction.createNewNote(newNote));
  }
  return <div className={styles.container}>
    <input type="text" name="" id="" placeholder="Add Your tasks" className={styles.inputForm} ref={noteDes} />
    <button className="btn btn-primary" onClick={() => {
      createNewNote();
    }}>Add</button>
  </div >
}

export default CreateNote;

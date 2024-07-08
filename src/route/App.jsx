import StickyNotes from "../components/StickyNotes";
import CreateNote from "../components/CreateNote";

import styles from "../css/App.module.css"


function App() {

  return <div className={styles.stickyBoard}>
    <div><CreateNote></CreateNote></div>
    <div><StickyNotes></StickyNotes></div>
  </div>
}

export default App

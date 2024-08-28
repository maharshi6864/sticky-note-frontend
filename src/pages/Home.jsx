import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StickyNotes from "../pages/StickyNotes";
import CreateNote from "../components/CreateNote";
import styles from "../css/App.module.css";
import { loadNotesFrom } from "../apis/home";
import { stickyNotesAction } from "../store/stickyNotesStore";

const Home = () => {
  const dispatch = useDispatch();
  const { username } = useSelector((store) => store.userDetails);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await loadNotesFrom();

        if (response.status) {
          console.log(response);

          dispatch(stickyNotesAction.loadNotes(response.object));
          setLoading(false);
        }
      } catch (error) {
        navigate("/login");
      }
    };
    fetchNotes();
  }, []);
  return loading ? (
    <div>
      <div className="h-100 w-100 d-flex align-items-center justify-content-center">
        <div
          className="spinner-border justify-content-center align-item-center"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.stickyBoard}>
      <div>
        <CreateNote></CreateNote>
      </div>
      <div>
        <StickyNotes></StickyNotes>
      </div>
    </div>
  );
};

export default Home;

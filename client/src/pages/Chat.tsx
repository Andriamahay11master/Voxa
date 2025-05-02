import { Link, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import firebase from "../firebase";
import { useEffect, useState } from "react";
import Loader from "../components/loader/Loader";
import { collection, getDocs, query, where } from "firebase/firestore";
import { UserType } from "../models/UserType";

const Chat = () => {
  const { user } = useAuth();
  const { displayName } = useParams<{ displayName: string }>();
  const [loading, setLoading] = useState(true);
  const [userFriend, setUserFriend] = useState<UserType | null>(null);

  useEffect(() => {
    if (!user) return;
    const getUserFriend = async () => {
      try {
        const q = query(
          collection(firebase.db, "users"),
          where("displayName", "==", displayName)
        );
        const querySnapshot = await getDocs(q);
        const userData = querySnapshot.docs[0].data() as UserType;
        setUserFriend(userData);
      } catch (err: any) {
        console.log(err.message || "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };
    getUserFriend();
  }, [user, displayName]);

  if (loading) {
    return (
      <div className="loader-container">
        <Loader size="large" />
      </div>
    );
  }
  return (
    <div className="content-page">
      <div className="content-top">
        <div className="content-left">
          <Link to="/" className="btn btn-icon">
            <i className="icon-arrow-left"></i>
          </Link>
          <img
            src={userFriend?.avatar || "/user.jpg"}
            alt={userFriend?.displayName + " avatar"}
          />
          <span>{userFriend?.displayName || ""}</span>
        </div>
        <div className="content-right">
          <button type="button" className="btn btn-icon">
            <i className="icon-video"></i>
          </button>
          <button type="button" className="btn btn-icon">
            <i className="icon-phone"></i>
          </button>
        </div>
      </div>
      <div className="content-form">
        <form action="">
          <input type="text" placeholder="Type a message" />
          <button type="submit" className="btn btn-primary btn-icon">
            <i className="icon-send"></i>
          </button>
        </form>
      </div>
    </div>
  );
};
export default Chat;

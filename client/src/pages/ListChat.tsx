import ButtonFixed from "../components/ButtonFixed/ButtonFixed";
import { getDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import firebase from "../firebase";
import { ChatType } from "../models/ChatType";
import { useEffect, useState } from "react";
import Loader from "../components/loader/Loader";

const ListChat = () => {
  const { user } = useAuth();
  const docRef = doc(firebase.db, "chats", user?.uid || "");
  const [chats, setChats] = useState<ChatType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getChats = async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setChats(docSnap.data().chats);
      }
    };

    getChats();
  }, [user?.uid]);

  if (loading)
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  return (
    <div className="list-chat">
      <div className="list-left">
        {chats.length === 0 && <p>No chats yet</p>}
        {chats.map((chat) => (
          <div className="chat-item" key={chat.id}>
            <div className="chat-picture">
              <img src={chat.pictureContact} alt={chat.pictureContact} />
            </div>
            <div className="chat-info">
              <span>{chat.nameContact}</span>
              <p>{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="list-right"></div>
      <ButtonFixed path="/contacts" classIcon="icon-user-plus" />
    </div>
  );
};
export default ListChat;

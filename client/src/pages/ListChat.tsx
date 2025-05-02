import ButtonFixed from "../components/ButtonFixed/ButtonFixed";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import firebase from "../firebase";
import { ChatType } from "../models/ChatType";
import { useEffect, useState } from "react";
import Loader from "../components/loader/Loader";

const ListChat = () => {
  const { user } = useAuth();
  const [chats, setChats] = useState<ChatType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    const getChats = async () => {
      try {
        const listsRef = collection(firebase.db, "chats");
        const q = query(
          listsRef,
          where("userId", "==", user.uid),
          where("isFriend", "==", true),
          orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        const listsData: ChatType[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          listsData.push({
            id: doc.id,
            nameContact: data.nameContact || "",
            pictureContact: data.pictureContact || "",
            messages: (data.messages || []).map((item: any, index: number) => ({
              ...item,
              id: index.toString(),
            })),
            lastMessage: data.lastMessage || "",
            lastMessageDate: data.lastMessageDate?.toDate() || new Date(),
            createdAt: data.createdAt?.toDate() || new Date(),
          });
        });
        setChats(listsData);
      } catch (err: any) {
        setError(err.message || "Failed to fetch lists chats");
      } finally {
        setLoading(false);
      }
    };

    getChats();
  }, [user]);

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
      <div className="list-right">
        {error && <div className="error-message">{error}</div>}
      </div>
      <ButtonFixed path="/contacts" classIcon="icon-user-plus" />
    </div>
  );
};
export default ListChat;

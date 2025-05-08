import ButtonFixed from "../components/ButtonFixed/ButtonFixed";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import firebase from "../firebase";
import { ChatType } from "../models/ChatType";
import { useEffect, useState } from "react";
import Loader from "../components/loader/Loader";
import { Link } from "react-router-dom";

interface ChatListItem extends ChatType {
  friendDisplayName: string;
  friendAvatar: string;
  friendUid: string;
}
const ListChat = () => {
  const { user } = useAuth();
  const [chats, setChats] = useState<ChatListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Helper to get friend info from participants array and chat document
  const getFriendInfo = (
    participants: string[],
    currentUserId: string,
    chatData: any
  ) => {
    // The friend is the participant who is NOT the current user
    const friendUid = participants.find((uid) => uid !== currentUserId) || "";
    // Try to get friend info from chat data (if stored)
    const friendDisplayName = chatData.nameContact || "";
    const friendAvatar = chatData.pictureContact || "/user.jpg";

    return { friendUid, friendDisplayName, friendAvatar };
  };

  useEffect(() => {
    if (!user) return;
    const getChats = async () => {
      setLoading(true);
      setError("");
      try {
        const chatsRef = collection(firebase.db, "chats");
        // Query chats where current user is participant
        const q = query(
          chatsRef,
          where("participants", "array-contains", user.uid),
          orderBy("lastMessageDate", "desc")
        );

        const querySnapshot = await getDocs(q);
        const listsData: ChatListItem[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();

          // Extract friend info
          const { friendUid, friendDisplayName, friendAvatar } = getFriendInfo(
            data.participants,
            user.uid,
            data
          );

          listsData.push({
            id: doc.id,
            participants: data.participants,
            messages: data.messages || [],
            lastMessage: data.lastMessage || "",
            lastMessageDate:
              data.lastMessageDate instanceof Timestamp
                ? data.lastMessageDate.toDate()
                : data.lastMessageDate
                ? new Date(data.lastMessageDate)
                : new Date(),
            createdAt:
              data.createdAt instanceof Timestamp
                ? data.createdAt.toDate()
                : data.createdAt
                ? new Date(data.createdAt)
                : new Date(),
            friendDisplayName,
            friendAvatar,
            friendUid,
          });
        });

        setChats(listsData);
      } catch (err: any) {
        setError(err.message || "Failed to fetch chat lists");
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
          <Link
            className="chat-item"
            to={`/chat/${chat.friendDisplayName}`}
            key={chat.id}
          >
            <div className="chat-picture">
              <img src={chat.friendAvatar} alt={chat.friendAvatar} />
            </div>
            <div className="chat-info">
              <span className="chat-name">{chat.friendDisplayName}</span>
              <p className="chat-message">{chat.lastMessage}</p>
            </div>
          </Link>
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

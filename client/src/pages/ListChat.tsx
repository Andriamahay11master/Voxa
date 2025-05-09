import ButtonFixed from "../components/ButtonFixed/ButtonFixed";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  Timestamp,
  onSnapshot,
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

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const listsData: ChatListItem[] = [];

          querySnapshot.forEach((doc) => {
            const data = doc.data();

            // Determine friend UID
            const friendUid = data.participants.find(
              (uid: string) => uid !== user.uid
            );

            // Get friend info from usersInfo object
            const friendInfo = data.usersInfo?.[friendUid] || {
              displayName: "Unknown",
              avatar: "/user.jpg",
            };

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
              friendDisplayName: friendInfo.displayName,
              friendAvatar: friendInfo.avatar,
              friendUid,
            });
          });

          setChats(listsData);
        });
        // Clean up on unmount:
        return () => unsubscribe();
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

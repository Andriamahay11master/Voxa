import { Link, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import firebase from "../firebase";
import { useEffect, useState } from "react";
import Loader from "../components/loader/Loader";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { UserType } from "../models/UserType";
import { ChatType } from "../models/ChatType";
import { MessageType } from "../models/MessageType";

const Chat = () => {
  const { user } = useAuth();
  const { displayName } = useParams<{ displayName: string }>();
  const [loading, setLoading] = useState(true);
  const [userFriend, setUserFriend] = useState<UserType | null>(null);
  const [message, setMessage] = useState("");
  const [chatCurrent, setChatCurrent] = useState<ChatType | null>(null);

  // Generate consistent chat ID for both participants
  const getChatId = (uid1: string, uid2: string) => {
    return [uid1, uid2].sort().join("_");
  };

  useEffect(() => {
    if (!user) return;
    const getUserFriend = async () => {
      try {
        const q = query(
          collection(firebase.db, "users"),
          where("displayName", "==", displayName)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          throw new Error("User not found");
        }
        const userData = querySnapshot.docs[0].data() as UserType;
        console.log(querySnapshot.docs[0].id);
        setUserFriend({ ...userData, uid: querySnapshot.docs[0].id });
      } catch (err: any) {
        console.log(err.message || "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };
    getUserFriend();
  }, [user, displayName]);

  useEffect(() => {
    if (!user || !userFriend) return;
    const chatId = getChatId(user.uid, userFriend.uid);
    const chatRef = doc(firebase.db, "chats", chatId);

    const unsubscribe = onSnapshot(chatRef, (doc) => {
      if (doc.exists()) {
        const chatData = doc.data() as ChatType;
        setChatCurrent({
          ...chatData,
          id: doc.id,
          messages: chatData.messages || [],
        });
      } else {
        // Create initial chat document if it doesn't exist
        setChatCurrent({
          id: chatId,
          participants: [user.uid, userFriend.uid],
          messages: [],
          lastMessage: "",
          lastMessageDate: new Date(),
          createdAt: new Date(),
        });
      }
    });
    return () => unsubscribe();
  }, [user, userFriend]);
  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim() || !user || !userFriend || !chatCurrent) return;

    try {
      // Reference to chats collection
      const chatId = getChatId(user.uid, userFriend.uid);
      const chatRef = doc(firebase.db, "chats", chatId);

      const newMessage: MessageType = {
        id: (chatCurrent.messages?.length || 0) + 1,
        text: message.trim(),
        senderId: user.uid,
        createdAt: new Date().toISOString(),
        read: false,
      };

      await setDoc(
        chatRef,
        {
          participants: [user.uid, userFriend.uid],
          messages: arrayUnion(newMessage),
          lastMessage: newMessage.text,
          lastMessageDate: newMessage.createdAt,
          createdAt: chatCurrent.createdAt || new Date().toISOString(),
        },
        { merge: true } // Merge with existing document if it exists
      );

      // Clear input
      setMessage("");
    } catch (error: any) {
      console.error("Error sending message:", error.message);
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <Loader size="large" />
      </div>
    );
  }
  return (
    <div className="content-page page-chat">
      <img src="/background.png" alt="background chat" />
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
      <div className="content-body">
        <div className="content-messages">
          {chatCurrent?.messages?.map((message) => (
            <div
              className={
                message.senderId === user?.uid
                  ? "message message-right"
                  : "message message-left"
              }
              key={message.id}
            >
              <p>{message.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="content-form">
        <form action="" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="btn btn-icon">
            <i className="icon-send"></i>
          </button>
        </form>
      </div>
    </div>
  );
};
export default Chat;

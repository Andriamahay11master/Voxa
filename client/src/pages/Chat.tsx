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
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { UserType } from "../models/UserType";

const Chat = () => {
  const { user } = useAuth();
  const { displayName } = useParams<{ displayName: string }>();
  const [loading, setLoading] = useState(true);
  const [userFriend, setUserFriend] = useState<UserType | null>(null);
  const [message, setMessage] = useState("");

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
  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userFriend);
    if (!message.trim()) return; // Ignore empty messages
    if (!user || !userFriend) return;

    try {
      // Reference to chats collection
      const chatsRef = collection(firebase.db, "chats");

      // Query to find existing chat between current user and friend
      const q = query(
        chatsRef,
        where("userId", "==", user.uid),
        where("friendId", "==", userFriend.uid)
      );
      const querySnapshot = await getDocs(q);

      let chatDocId = "";
      if (!querySnapshot.empty) {
        // Chat exists
        chatDocId = querySnapshot.docs[0].id;
      } else {
        // Create new chat document if not exists
        const newChatRef = doc(chatsRef);
        chatDocId = newChatRef.id;
        await setDoc(newChatRef, {
          userId: user.uid,
          friendId: userFriend.uid,
          nameContact: userFriend.displayName,
          pictureContact: userFriend.avatar || "/user.jpg",
          messages: [
            {
              id: (querySnapshot.docs[0]?.data()?.messages?.length || 0) + 1,
              text: message.trim(),
              senderId: user.uid,
              createdAt: serverTimestamp(),
              state: false,
            },
          ],
          lastMessage: message,
          lastMessageDate: serverTimestamp(),
          createdAt: serverTimestamp(),
          isFriend: true,
        });
      }

      // Reference to chat document
      const chatDocRef = doc(firebase.db, "chats", chatDocId);

      // New message object
      const newMessage = {
        id: Date.now().toString(), // or use a UUID
        text: message.trim(),
        senderId: user.uid,
        createdAt: serverTimestamp(),
      };

      // Update chat document with new message and last message info
      await updateDoc(chatDocRef, {
        messages: arrayUnion(newMessage),
        lastMessage: newMessage.text,
        lastMessageDate: serverTimestamp(),
      });

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

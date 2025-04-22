import ButtonFixed from "../components/ButtonFixed/ButtonFixed";
import { getDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import firebase from "../firebase";
import { ChatType } from "../models/ChatType";
import { useState } from "react";

const ListChat = () => {
  const docRef = doc(firebase.db, "users", "user1");
  const [chats, setChats] = useState<ChatType[]>([]);
  //function to get List Chat from firestore
  const getListChat = async () => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  return (
    <div className="list-chat">
      <ButtonFixed path="/contacts" classIcon="icon-user-plus" />
    </div>
  );
};
export default ListChat;

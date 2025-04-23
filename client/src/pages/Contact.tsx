import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { UserType } from "../models/UserType";
import firebase from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../components/loader/Loader";

const Contact = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  const docRef = doc(firebase.db, "users", user?.uid || "");

  useEffect(() => {
    const fetchUsers = async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUsers(docSnap.data().contacts);
        setLoading(false);
      }
    };
    fetchUsers();
    setLoading(false);
  }, [user?.uid]);

  //function to get the numbers of users in the app
  const getNumberOfUsers = () => {
    return users.length;
  };

  if (loading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  return (
    <div className="list-users">
      <div className="list-users-top">
        <div className="list-top-left">
          <h3>Contacts</h3>
          <span>{getNumberOfUsers()} contacts</span>
        </div>
        <div className="list-top-right">
          <input type="text" placeholder="Search" />
          <i className="icon-search"></i>
        </div>
      </div>
      <div className="list-users-bottom">
        <div className="list-body">
          {users.map((user) => (
            <div className="user-item" key={user.id}>
              <div className="user-picture">
                <img src={user.avatar} alt={user.avatar} />
              </div>
              <div className="user-info">
                <p>{user.displayName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Contact;

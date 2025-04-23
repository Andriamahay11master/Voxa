import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { UserType } from "../models/UserType";
import firebase from "../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Loader from "../components/loader/Loader";

const Contact = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    const fetchUsers = async () => {
      try {
        const usersRef = collection(firebase.db, "users");
        const q = query(usersRef, orderBy("displayName"));
        const querySnapshot = await getDocs(q);
        const usersData: UserType[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          usersData.push({
            displayName: data.displayName || "",
            avatar: data.avatar || "",
            email: data.email || "",
            phoneNumber: data.phoneNumber || "",
            bio: data.bio || "",
            adress: data.adress || "",
          });
        });
        setUsers(usersData);
      } catch (err: any) {
        setError(err.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [user]);

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
          {error && <div className="error-message">{error}</div>}
          {users.map((user) => (
            <div className="user-item" key={user.displayName}>
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

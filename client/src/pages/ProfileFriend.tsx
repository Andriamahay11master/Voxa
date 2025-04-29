import { useParams } from "react-router-dom";
import ProfileComponent from "../components/profile/ProfileComponent";
import { useEffect, useState } from "react";
import { UserType } from "../models/UserType";
import { useAuth } from "../contexts/AuthContext";
import firebase from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../components/loader/Loader";

const ProfileFriend = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserType | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userRef = doc(firebase.db, "users", userId ?? "");
        const userSnapshot = await getDoc(userRef);
        const userData = userSnapshot.data() as UserType;
        setUserData(userData);
      } catch (err: any) {
        setError(err.message || "Failed to fetch user data");
      }
    };
    getUserData();
  }, [user]);

  if (loading) {
    return (
      <div className="loader-container">
        <Loader size="large" />
      </div>
    );
  }

  return (
    <div className="content-page">
      {error && <div className="error-message">{error}</div>}
      {userData && <ProfileComponent user={userData} userFriendId={userId} />}
    </div>
  );
};
export default ProfileFriend;

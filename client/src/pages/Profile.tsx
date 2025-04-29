import ProfileComponent from "../components/profile/ProfileComponent";
import firebase from "../firebase";
import { useEffect, useState } from "react";
import { UserType } from "../models/UserType";
import Loader from "../components/loader/Loader";
import { useAuth } from "../contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState<UserType | null>(null);

  useEffect(() => {
    if (!user) return;
    const fetchUserData = async () => {
      try {
        const userRef = doc(firebase.db, "users", user.uid);
        const userSnapshot = await getDoc(userRef);
        const userData = userSnapshot.data() as UserType;
        setUserData(userData);
      } catch (err: any) {
        setError(err.message || "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [user, userData]);

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
      {userData && <ProfileComponent userContext={user} user={userData} />}
    </div>
  );
};
export default Profile;

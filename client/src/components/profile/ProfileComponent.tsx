import { useState } from "react";
import { UserType } from "../../models/UserType";
import firebase from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { User } from "firebase/auth";

interface ProfileComponentProps {
  userContext?: User | null;
  user: UserType;
  userFriendId?: string;
}

const ProfileComponent = ({
  userContext,
  user,
  userFriendId,
}: ProfileComponentProps) => {
  const [userLocale, setUserLocale] = useState<UserType>(user);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: userLocale.displayName,
    bio: userLocale.bio,
    phoneNumber: userLocale.phoneNumber,
  });

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleEditForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const saveEditUser = async () => {
    const userRef = doc(firebase.db, "users", userContext!.uid);
    try {
      await updateDoc(userRef, {
        displayName: editForm.displayName,
        bio: editForm.bio,
        phoneNumber: editForm.phoneNumber,
      });
      setUserLocale({
        ...userLocale,
        displayName: editForm.displayName,
        bio: editForm.bio,
        phoneNumber: editForm.phoneNumber,
      });
    } catch (err: any) {
      console.log(err);
    } finally {
      setEditMode(false);
    }
  };

  //function change photo
  const handleProfilePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "profile_doc"); // from Cloudinary dashboard

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dcctxqmgj/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      const url = data.secure_url;

      const userRef = doc(firebase.db, "users", userContext!.uid);
      await updateDoc(userRef, { avatar: url });
      setUserLocale({ ...userLocale, avatar: url });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profile-component">
      {!userFriendId && (
        <button className="btn btn-icon" onClick={() => setEditMode(true)}>
          <i className="icon-edit"></i>
        </button>
      )}
      <div className="profil-top">
        <div className="profil-picture">
          <img
            src={userLocale.avatar ? userLocale.avatar : "/user.jpg"}
            alt={userLocale.avatar}
          />
          <div className="action-change-photo">
            <input
              type="file"
              accept="image/*"
              id="file"
              style={{ display: "none" }}
              onChange={handleProfilePhoto}
            />
            <label htmlFor="file">
              <i className="icon-camera"></i>
            </label>
          </div>
        </div>
      </div>
      <div className="profil-content">
        <div className="profil-info-item">
          <div className="profil-item-left">
            <i className="icon-user"></i>
          </div>
          <div className="profil-item-right">
            <h3 className="profil-info-title">Name</h3>
            {editMode ? (
              <input
                type="text"
                name="displayName"
                value={editForm.displayName}
                onChange={handleEditForm}
              />
            ) : (
              <p>{userLocale.displayName}</p>
            )}
          </div>
        </div>
        <div className="profil-info-item">
          <div className="profil-item-left">
            <i className="icon-info"></i>
          </div>
          <div className="profil-item-right">
            <h3 className="profil-info-title">Infos</h3>
            {editMode ? (
              <input
                type="text"
                name="bio"
                value={editForm.bio}
                onChange={handleEditForm}
              />
            ) : (
              <p>{userLocale.bio || "Hello, I'm using Voxa"}</p>
            )}
          </div>
        </div>
        <div className="profil-info-item">
          <div className="profil-item-left">
            <i className="icon-phone"></i>
          </div>
          <div className="profil-item-right">
            <h3 className="profil-info-title">Telephone number</h3>

            {editMode ? (
              <input
                type="text"
                name="phoneNumber"
                value={editForm.phoneNumber}
                onChange={handleEditForm}
              />
            ) : (
              <p>{userLocale.phoneNumber || "Not set"}</p>
            )}
          </div>
        </div>
      </div>
      {editMode && (
        <div className="profil-edit-action">
          <button className="btn btn-primary" onClick={saveEditUser}>
            Save
          </button>
          <button className="btn btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;

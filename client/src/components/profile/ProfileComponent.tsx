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
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: user.displayName,
    bio: user.bio,
    phoneNumber: user.phoneNumber,
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
    } catch (err: any) {
      console.log(err);
    } finally {
      setEditMode(false);
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
            src={user.avatar ? user.avatar : "/user.jpg"}
            alt={user.avatar}
          />
          <div className="action-change-photo">
            <input
              type="file"
              accept="image/*"
              id="file"
              style={{ display: "none" }}
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
              <p>{user.displayName}</p>
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
              <p>{user.bio || "Hello, I'm using Voxa"}</p>
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
              <p>{user.phoneNumber || "Not set"}</p>
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

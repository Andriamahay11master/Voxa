import { useState } from "react";
import { UserType } from "../../models/UserType";

interface ProfileComponentProps {
  user: UserType;
}
const ProfileComponent = ({ user }: ProfileComponentProps) => {
  const [editMode, setEditMode] = useState(false);

  const handleCancel = () => {
    setEditMode(false);
  };
  return (
    <div className="profile-component">
      <button className="btn btn-icon" onClick={() => setEditMode(true)}>
        <i className="icon-edit"></i>
      </button>
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
                value={user.displayName}
                onChange={(e) => console.log(e.target.value)}
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
                value={user.bio}
                onChange={(e) => console.log(e.target.value)}
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
                value={user.phoneNumber}
                onChange={(e) => console.log(e.target.value)}
              />
            ) : (
              <p>{user.phoneNumber || "Not set"}</p>
            )}
          </div>
        </div>
      </div>
      {editMode && (
        <div className="profil-edit-action">
          <button
            className="btn btn-primary"
            onClick={() => setEditMode(false)}
          >
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

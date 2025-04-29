import { UserType } from "../../models/UserType";

interface ProfileComponentProps {
  user: UserType;
}
const ProfileComponent = ({ user }: ProfileComponentProps) => {
  return (
    <div className="profile-component">
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
            <p>{user.displayName}</p>
          </div>
        </div>
        <div className="profil-info-item">
          <div className="profil-item-left">
            <i className="icon-info"></i>
          </div>
          <div className="profil-item-right">
            <h3 className="profil-info-title">Infos</h3>
            <p>{user.bio || "Hello, I'm using Voxa"}</p>
          </div>
        </div>
        <div className="profil-info-item">
          <div className="profil-item-left">
            <i className="icon-phone"></i>
          </div>
          <div className="profil-item-right">
            <h3 className="profil-info-title">Telephone number</h3>
            <p>{user.phoneNumber || "Not set"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileComponent;

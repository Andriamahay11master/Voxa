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
            <h3>Nom</h3>
            <p>{user.displayName}</p>
          </div>
        </div>
        <div className="profil-info-item">
          <div className="profil-item-left">
            <i className="icon-info"></i>
          </div>
          <div className="profil-item-right">
            <h3>Infos</h3>
            <p>{user.bio}</p>
          </div>
        </div>
        <div className="profil-info-item">
          <div className="profil-item-left">
            <i className="icon-user"></i>
          </div>
          <div className="profil-item-right">
            <h3>Téléphone</h3>
            <p>{user.phoneNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileComponent;

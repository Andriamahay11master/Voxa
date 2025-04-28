import { UserType } from "../../models/UserType";

const Profile = (user: UserType) => {
  return (
    <div className="profile-component">
      <div className="profil-top">
        <img src={user.avatar ? user.avatar : "/user.jpg"} alt={user.avatar} />
        <button className="btn btn-icon">
          <i className="icon-camera"></i>
        </button>
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
export default Profile;

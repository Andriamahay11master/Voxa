import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { UserType } from "../models/UserType";

const Contact = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserType[]>([]);
  return (
    <div className="list-users">
      <div className="list-users-top">
        <div className="list-top-left">
          <h3>Contacts</h3>
          <span>105 contacts</span>
        </div>
        <div className="list-top-right">
          <input type="text" placeholder="Search" />
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

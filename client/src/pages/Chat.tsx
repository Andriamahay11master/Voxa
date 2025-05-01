import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import firebase from "../firebase";
import { useEffect, useState } from "react";
import Loader from "../components/loader/Loader";
import { doc, getDoc } from "firebase/firestore";

const Chat = () => {
  const { user } = useAuth();
  const { displayName } = useParams<{ displayName: string }>();

  return (
    <div className="content-page">
      <div className="content-top">
        <div className="content-left">
          <button type="button">
            <i className="icon-arrow-left"></i>
          </button>
          <img
            src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
          />
          <span>John Doe</span>
        </div>
        <div className="content-right">
          <button type="button">
            <i className="icon-video"></i>
          </button>
          <button type="button">
            <i className="icon-call"></i>
          </button>
        </div>
      </div>
      <div className="content-form">
        <form action="">
          <input type="text" placeholder="Type a message" />
          <button type="submit">
            <i className="icon-send"></i>
          </button>
        </form>
      </div>
    </div>
  );
};
export default Chat;

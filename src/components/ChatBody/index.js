import "./styles.css";
import { useEffect, useState } from "react";
import LeftFrame from "./../LeftFrame";
import RightFrame from "./../RightFrame";
import getConversations from "./getConversations";
import emitSocket from "./emitSocket";
import { checkMessageTimeout } from "../../constants";
import { getUsername, getId } from "../Private";

export default function ChatBody() {
  const [selected, setSelected] = useState(-1);
  const [conversations, setConversations] = useState([]);
  const [myUser, setMyUser] = useState({});

  useEffect(() => getConversations(setConversations), []);
  useEffect(() => {
    setMyUser({ _id: getId(), username: getUsername() });
  }, []);
  useEffect(() => {
    let messagesField = document.getElementsByClassName("messages-field")[0];
    messagesField.scrollTop = messagesField.scrollHeight;
  }, [conversations]);
  useEffect(() => {
    setInterval(() => emitSocket(setConversations), checkMessageTimeout);
  }, []);

  const handleSelect = (id) => {
    setSelected(conversations.findIndex((conv) => conv._id === id));
  };

  const pushMyMessage = (message) => {
    const newMessage = {
      _id: "",
      text: message,
      time: Date.now(),
      user: myUser._id,
    };

    let updatedConversations = [...conversations];
    updatedConversations[selected].messages.push(newMessage);
    setConversations(updatedConversations);
  };

  // setInterval(emitSocket(setConversations), 100000)

  return (
    <div className="main-chat">
      <div className="chat-header" />
      <div className="chat-frame">
        <div className="left-frame">
          <LeftFrame
            conversations={conversations}
            selected={selected}
            selectContactHandler={handleSelect}
          />
        </div>
        <div className="right-frame">
          <RightFrame
            pushMyMessage={pushMyMessage}
            conversation={selected !== -1 ? conversations[selected] : {}}
            contactClicked={selected !== -1 ? true : false}
            myUser={myUser}
          />
        </div>
      </div>
    </div>
  );
}

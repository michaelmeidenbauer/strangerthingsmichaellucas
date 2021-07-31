import React, { useEffect, useState } from "react";
import { getMyInfo } from "../api/api";

const Profile = () => {
  const [myInfo, updateMyInfo] = useState({});
  useEffect(async () => {
    const token = JSON.parse(
      window.localStorage.getItem("strangersThingsToken")
    );
    const myInfoResponse = await getMyInfo(token);
    updateMyInfo(myInfoResponse.data);
  }, []);
  console.log(myInfo);
  return (
    <div>
      <h2>Messages to {myInfo.username}</h2>
      {/* need logic to match id and only render my messages */}
      {myInfo.messages &&
        myInfo.messages
          .filter((message) => message.fromUser.username !== myInfo.username)
          .map((message) => (
            <div className="message">
              <h3>From: {message.fromUser.username}</h3>
              <p>{message.content}</p>
              <p>Post: {message.post.title}</p>
            </div>
          ))}
      <h2>Message from {myInfo.username}</h2>
      {myInfo.messages &&
        myInfo.messages
          .filter((message) => message.fromUser.username === myInfo.username)
          .map((message) => (
            <div className="message">
              <p>{message.content}</p>
              <p>Post: {message.post.title}</p>
            </div>
          ))}
    </div>
  );
};

export default Profile;

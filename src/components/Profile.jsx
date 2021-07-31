import React from "react";
import { getMyInfo } from "../api/api";

const token = window.localStorage.getItem("strangersThingsToken");
console.log(token);
const Profile = async () => {
  const myInfoResponse = await getMyInfo(token);
  const { posts, messages } = myInfoResponse;
  return (
    <div>
      <h2>Messages to me</h2>
      {/* need logic to match id and only render my messages */}
      {/* {messages.map((message) => (
        <div className="message">
          <h3>From: {message.fromUser.username}</h3>
          <p>{message.content}</p>
          <p>Post: {message.post.title}</p>
        </div>
      ))}
      <h2>Message from me</h2>
        {messages.map} */}
    </div>
  );
};

export default Profile;

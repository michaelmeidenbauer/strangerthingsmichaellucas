/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react";
import { getMyInfo, getAllPosts } from "../api/api";
import Loading from "./Loading";
import Message from "./Message";

const Profile = () => {
  const [myInfo, updateMyInfo] = useState({});
  const [allPosts, updateAllPosts] = useState([]);

  useEffect(async () => {
    const token = JSON.parse(
      window.localStorage.getItem("strangersThingsToken")
    );
    const myInfoResponse = await getMyInfo(token);
    const myPostsResponse = await getAllPosts(token);
    updateMyInfo(myInfoResponse.data);
    updateAllPosts(myPostsResponse);
  }, []);

  if(!myInfo.messages || !allPosts) {
    return <Loading contentType='profile'/>
  }

  return (
    <div>
      <h2>Messages to {myInfo.username}</h2>
      {myInfo.messages &&
        myInfo.messages
          .filter((message) => message.fromUser.username !== myInfo.username)
          .map((message) => {
            const postId = message.post._id;
            const matchedPost = myInfo.posts.filter(
              (post) => post._id === postId
            )[0];
            if (matchedPost && matchedPost.active) {
              return (
                <Message message={message} postId={postId} />
              );
            }
            return (
              <Message message={message} postId={postId} deleted/>
            );
          })}

      <h2>Message from {myInfo.username}</h2>
      {myInfo.messages &&
        myInfo.messages
          .filter((message) => message.fromUser.username === myInfo.username)
          .map((message) => {
            const postId = message.post._id;
            const matchedPost = allPosts.filter(
              (post) => post._id === postId
            )[0];

            if (matchedPost && matchedPost.active) {
              return (
                <Message message={message} postId={postId} />
              );
            }
            return (
              <Message message={message} postId={postId} deleted/>
            );
          })}
    </div>
  );
};

export default Profile;

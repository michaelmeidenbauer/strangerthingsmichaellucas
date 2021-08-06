/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyInfo, getAllPosts } from "../api/api";
import Loading from "./Loading"

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
    return <Loading contentType='messages'/>
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
            if (matchedPost.active) {
              return (
                <div className="message">
                  <h3>From: {message.fromUser.username}</h3>
                  <p>{message.content}</p>
                  <Link to={`/posts/${postId}`}>
                    <p>Post: {message.post.title}</p>{" "}
                  </Link>
                </div>
              );
            }
            return (
              <div className="message">
                <h3>From: {message.fromUser.username}</h3>
                <p>{message.content}</p>
                <p>Post: {message.post.title}</p>
                <p>(deleted post)</p>
              </div>
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

            if (matchedPost.active) {
              return (
                <div className="message">
                  <h3>From: {message.fromUser.username}</h3>
                  <p>{message.content}</p>
                  <Link to={`/posts/${postId}`}>
                    <p>Post: {message.post.title}</p>{" "}
                  </Link>
                </div>
              );
            }
            return (
              <div className="message">
                <h3>From: {message.fromUser.username}</h3>
                <p>{message.content}</p>
                <p>Post: {message.post.title}</p>
                <p>(deleted post)</p>
              </div>
            );
          })}
    </div>
  );
};

export default Profile;

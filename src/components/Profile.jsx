/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import { getMyInfo, getAllPosts } from "../api/api";
import Loading from "./Loading";
import Message from "./Message";
import ListPost from "./ListPost";

const Profile = (props) => {
  const { isLoggedIn } = props;

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

  if (!myInfo.messages || !allPosts) {
    return <Loading contentType="profile" />;
  }

  return (
    <Container>
      <div>
        <Container className="content-align-center mx-auto mt-3">
          <h2>My Messages</h2>
          <Accordion defaultActiveKey="0" className="block border">
            <Accordion.Header>Messages to {myInfo.username}</Accordion.Header>
            <Accordion.Body>
              {myInfo.messages &&
                myInfo.messages
                  .filter(
                    (message) => message.fromUser.username !== myInfo.username
                  )
                  .map((message) => {
                    const postId = message.post._id;
                    const matchedPost = myInfo.posts.filter(
                      (post) => post._id === postId
                    )[0];
                    if (matchedPost && matchedPost.active) {
                      return <Message key={message._id} message={message} postId={postId} />;
                    }
                    return (
                      <Message key={message._id} message={message} postId={postId} deleted />
                    );
                  })}
            </Accordion.Body>
          </Accordion>

          <Accordion className="block border">
            <Accordion.Header>Messages from {myInfo.username}</Accordion.Header>
            <Accordion.Body>
              {myInfo.messages &&
                myInfo.messages
                  .filter(
                    (message) => message.fromUser.username === myInfo.username
                  )
                  .map((message) => {
                    const postId = message.post._id;
                    const matchedPost = allPosts.filter(
                      (post) => post._id === postId
                    )[0];

                    if (matchedPost && matchedPost.active) {
                      return <Message key={message._id} message={message} postId={postId} />;
                    }
                    return (
                      <Message key={message._id} message={message} postId={postId} deleted />
                    );
                  })}
            </Accordion.Body>
          </Accordion>
        </Container>
        <Container className="content-align-center mx-auto mt-3">
          <h2>My Posts</h2>
          {isLoggedIn && (
            <Link
              to={{
                pathname: `/posts/add`,
              }}
            >
              Add Post
            </Link>
          )}
          {allPosts &&
            allPosts
              .filter((post) => post.author._id === myInfo._id)
              .map((post) => (
                <div key={post._id}>
                  <ListPost post={post} />
                </div>
              ))}
        </Container>
      </div>
    </Container>
  );
};

Profile.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Profile;

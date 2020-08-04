import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { COLORS } from "../constants";

import Tweet from "./Tweet";

const ProfileFeed = ({ thisHandle }) => {
  console.log(thisHandle);

  const [profileFeed, setProfileFeed] = React.useState("Tweets");
  const [profileStatus, setProfileStatus] = React.useState("loading");
  const [profileFeedArray, setProfileFeedArray] = React.useState([]);
  const [profileFeedOrder, setProfileFeedOrder] = React.useState([]);

  console.log("profileFeed", profileFeed);

  const handleClickTweets = () => {
    setProfileFeed("Tweets");
  };

  const handleClickMedia = () => {
    setProfileFeed("Media");
  };

  const handleClickLikes = () => {
    setProfileFeed("Likes");
  };

  React.useEffect(() => {
    console.log(thisHandle);
    fetch(`/api/${thisHandle}/feed`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProfileStatus("idle");
        setProfileFeedArray(Object.values(data.tweetsById));
        setProfileFeedOrder(data.tweetIds);
      })
      .catch((err) => {
        console.log("something's wrong, dummy!", err);
      });
  }, []);

  return (
    <>
      <Divider />
      <ProfileNavBar>
        <Tippy content={"Click to view this user's tweets"}>
          <ProfileNavButton
            activeStyle={{ color: COLORS.primary, textDecoration: "underline" }}
            onClick={handleClickTweets}
          >
            Tweets
          </ProfileNavButton>
        </Tippy>
        <Tippy content={"Click to view this user's media"}>
          <ProfileNavButton
            activeStyle={{ color: COLORS.primary, textDecoration: "underline" }}
            onClick={handleClickMedia}
          >
            Media
          </ProfileNavButton>
        </Tippy>
        <Tippy
          content={
            "Click to view this user's likes JUST KIDDING THERE IS NOTHING HERE."
          }
        >
          <ProfileNavButton
            activeStyle={{ color: COLORS.primary, textDecoration: "underline" }}
            onClick={handleClickLikes}
          >
            Likes
          </ProfileNavButton>
        </Tippy>
      </ProfileNavBar>
      <Divider />
      {profileFeed === "Tweets" &&
        profileFeedOrder.map((tweetId) => {
          const thisTweet = profileFeedArray.find(
            (tweet) => tweetId === tweet.id
          );
          console.log(thisTweet);
          return (
            <FakeDiv key={thisTweet.id}>
              <Link to={`/tweet/${tweetId}`} aria-label="view tweet">
                <Tweet thisTweet={thisTweet} key={thisTweet.id} />
              </Link>
              <Divider />
            </FakeDiv>
          );
        })}
      {profileFeed === "Media" &&
        profileFeedOrder.map((tweetId) => {
          const thisTweet = profileFeedArray.find(
            (tweet) => tweetId === tweet.id
          );
          console.log(thisTweet);
          return (
            <>
              {thisTweet.media.length > 0 && (
                <FakeDiv key={thisTweet.id}>
                  <Link to={`/tweet/${tweetId}`} aria-label="view tweet">
                    <Tweet thisTweet={thisTweet} />
                  </Link>
                  <Divider />
                </FakeDiv>
              )}
            </>
          );
        })}
    </>
  );
};

const FakeDiv = styled.div``;
const ProfileNavBar = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ProfileNavButton = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  width: 100%;
  padding: 20px;

  &:hover {
    background-color: ${COLORS.primary};
    color: white;
    cursor: pointer;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: rgb(230, 236, 240);
`;

export default ProfileFeed;

import React from "react";
import { FiMessageCircle, FiRepeat, FiHeart, FiShare } from "react-icons/fi";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import styled from "styled-components";
import Action from "./Action";
import { v4 as uuidv4 } from "uuid";
import { CurrentUserContext } from "./CurrentUserContext";

const TweetActionBar = ({ thisTweet, tweetFeedFetch }) => {
  const { currentUserProfile } = React.useContext(CurrentUserContext);

  const [needNewFetch, setNeedNewFetch] = React.useState(false);

  React.useEffect(() => {
    tweetFeedFetch();
  }, [needNewFetch]);

  const handleToggleLike = () => {
    console.log(thisTweet);
    fetch(`/api/tweet/${thisTweet.id}/like`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        like: !thisTweet.isLiked,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        // window.location.reload(false);
        setNeedNewFetch(!needNewFetch);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("like button clicked");
  };

  const handleToggleRetweet = () => {
    console.log(thisTweet);

    fetch(`/api/tweet/${thisTweet.id}/retweet`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        retweet: !thisTweet.isRetweeted,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setNeedNewFetch(!needNewFetch);
        // window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("retweet button clicked");
  };
  console.log("thisTweet.numLike", thisTweet.numLikes);

  const likedStyle = {
    height: "40px",
    width: "40px",
  };

  const retweetedStyle = {
    height: "40px",
    width: "40px",
  };
  return (
    <ActionBar>
      <FiMessageCircle />
      <Tippy content="Retweet it!">
        <ActionDiv>
          <Action
            onClick={handleToggleRetweet}
            color="rgb(23, 191, 99)"
            size={40}
          >
            <FiRepeat style={thisTweet.isRetweeted ? retweetedStyle : null} />
          </Action>
          {thisTweet.numRetweets > 0 && <span>{thisTweet.numRetweets}</span>}
        </ActionDiv>
      </Tippy>
      <Tippy content="Like it!">
        <ActionDiv>
          <Action onClick={handleToggleLike} color="rgb(224, 36, 94)" size={40}>
            <FiHeart style={thisTweet.isLiked ? likedStyle : null} />
          </Action>
          {thisTweet.numLikes > 0 && <span>{thisTweet.numLikes}</span>}
        </ActionDiv>
      </Tippy>
      <FiShare />
    </ActionBar>
  );
};

const ActionBar = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const ActionDiv = styled.div`
  display: flex;
  align-items: center;
`;

export default TweetActionBar;

import React from "react";
import moment from "moment";
import { FiRepeat } from "react-icons/fi";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import styled from "styled-components";
import { COLORS } from "../constants";
import { useHistory } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";

const Tweet = ({ thisTweet }) => {
  const { currentUserProfile } = React.useContext(CurrentUserContext);
  console.log(thisTweet);
  let history = useHistory();
  const handleClick = () => {
    history.push(`/${thisTweet.author.handle}`);
  };
  const handleKeyDown = (ev) => {
    if (ev.key === "Enter") {
      history.push(`/${thisTweet.author.handle}`);
    }
  };
  return (
    <>
      <TweetAll>
        {thisTweet.retweetFrom && (
          <RetweetDiv>
            {" "}
            <FiRepeat />
            {thisTweet.retweetFrom.displayName} remeowed
            {thisTweet.isRetweeted && (
              <RetweetDiv>
                <FiRepeat />
                {currentUserProfile.displayName} remeowed
              </RetweetDiv>
            )}
          </RetweetDiv>
        )}
        <TweetWrapper>
          <div>
            <Avatar
              src={thisTweet.author.avatarSrc}
              alt={`avatar for user @${thisTweet.author.handle}`}
            />
          </div>
          <TweetContent>
            <NameHandleDate>
              <Tippy content="Learn all about this Critter user.">
                <UserName
                  onMouseDown={handleClick}
                  onKeyDown={handleKeyDown}
                  aria-label="view user profile"
                  tabIndex="0"
                >
                  <h2>{thisTweet.author.displayName}</h2>
                </UserName>
              </Tippy>
              <HandleDate>
                @{thisTweet.author.handle} - {moment().format("MMM Do")}
              </HandleDate>
            </NameHandleDate>
            <TweetStatus>{thisTweet.status}</TweetStatus>
            {thisTweet.media.length > 0 &&
              thisTweet.media[0].type === "img" && (
                <TweetMedia
                  src={thisTweet.media[0].url}
                  alt={`media accompanying tweet ${thisTweet.status}`}
                />
              )}
            {/* <TweetActionBar thisTweet={thisTweet} /> */}
          </TweetContent>
        </TweetWrapper>
      </TweetAll>
    </>
  );
};

const RetweetDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left: 35px;
`;

const UserName = styled.div`
  z-index: 10;
  padding: 3px;
  &:hover {
    background-color: ${COLORS.primary};
    color: white;
    cursor: pointer;
    border-radius: 5px;
  }
`;

const Avatar = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  padding: 10px;
`;

const TweetAll = styled.div``;

const TweetWrapper = styled.div`
  display: flex;
`;

const NameHandleDate = styled.div`
  display: flex;
`;

const TweetContent = styled.div`
  padding: 10px;
`;

const TweetStatus = styled.p`
  padding: 10px 0;
`;

const HandleDate = styled.p`
  color: grey;
  margin-left: 5px;
  padding: 3px;
`;

const TweetMedia = styled.img`
  width: 500px;
  border-radius: 10px;
`;

export default Tweet;

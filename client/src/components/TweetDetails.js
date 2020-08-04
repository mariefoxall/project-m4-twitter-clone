import React from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { FiArrowLeft, FiRepeat } from "react-icons/fi";
import moment from "moment";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import styled from "styled-components";
import TweetActionBar from "./TweetActionBar";
import { CurrentUserContext } from "./CurrentUserContext";
import ErrorScreen from "./ErrorScreen";
import Loading from "./Loading";
import { COLORS } from "../constants";

const TweetDetails = () => {
  const { tweetId } = useParams();
  console.log(tweetId);
  const [thisTweet, setThisTweet] = React.useState({});
  const [fetchStatus, setFetchStatus] = React.useState("loading");
  const { serverError, setServerError, currentUserProfile } = React.useContext(
    CurrentUserContext
  );

  const [errorMessage, setErrorMessage] = React.useState("");

  let history = useHistory();
  const handleClick = () => {
    history.push(`/${thisTweet.tweet.author.handle}`);
  };
  const handleKeyDown = (ev) => {
    if (ev.key === "Enter") {
      history.push(`/${thisTweet.tweet.author.handle}`);
    }
  };

  console.log(currentUserProfile);

  const thisTweetFetch = () => {
    fetch(`/api/tweet/${tweetId}`)
      .then((response) => response.json())
      .then((data) => {
        setThisTweet(data);
        // console.log("inside useeffect", data);
        setServerError(false);
        setFetchStatus("idle");
      })
      .catch((err) => {
        console.log("something's wrong, dummy!", err);
        setServerError(true);
        setErrorMessage("Please refresh the page to try again.");
      });
  };

  React.useEffect(() => {
    thisTweetFetch();
  }, []);
  return (
    <>
      {fetchStatus === "loading" ? (
        <Loading />
      ) : (
        <>
          {serverError === true ? (
            <ErrorScreen message={errorMessage} />
          ) : (
            <>
              <TweetWrapper>
                <Link to="/">
                  <ReturnHomeMeow>
                    <FiArrowLeft />
                    <h1>Meow</h1>
                  </ReturnHomeMeow>
                </Link>
                <Divider />
                <>
                  {thisTweet.tweet && (
                    <>
                      {thisTweet.tweet.retweetFrom && (
                        <RetweetDiv>
                          <FiRepeat />
                          {thisTweet.tweet.retweetFrom.displayName} remeowed
                          {thisTweet.tweet.isRetweeted && (
                            <RetweetDiv>
                              <FiRepeat />
                              {currentUserProfile.displayName}
                              remeowed
                            </RetweetDiv>
                          )}
                        </RetweetDiv>
                      )}
                      <Author>
                        <Avatar
                          src={thisTweet.tweet.author.avatarSrc}
                          alt={`avatar for user @${thisTweet.tweet.author.handle}`}
                        />
                        <div>
                          <Tippy content="Learn all about this Critter user.">
                            <UserName
                              onMouseDown={handleClick}
                              onKeyDown={handleKeyDown}
                              aria-label="view user profile"
                              tabIndex="0"
                            >
                              <h2>{thisTweet.tweet.author.displayName}</h2>
                            </UserName>
                          </Tippy>
                          <Handle>@{thisTweet.tweet.author.handle} </Handle>
                        </div>
                      </Author>
                      <TweetContent>
                        <TweetStatus>{thisTweet.tweet.status}</TweetStatus>
                        {thisTweet.tweet.media.length > 0 &&
                          thisTweet.tweet.media[0].type === "img" && (
                            <TweetMedia
                              src={thisTweet.tweet.media[0].url}
                              alt={`media accompanying tweet ${thisTweet.tweet.status}`}
                            />
                          )}
                        <Date>
                          {moment().format("h:mm A - MMM DD YYYY")} - Critter
                          web app
                        </Date>
                      </TweetContent>
                      <Divider />
                      <TweetActionBar
                        thisTweet={thisTweet.tweet}
                        tweetFeedFetch={thisTweetFetch}
                      />
                      <Divider />
                    </>
                  )}
                </>
              </TweetWrapper>
            </>
          )}
        </>
      )}
    </>
  );
};

const ReturnHomeMeow = styled.div`
  display: flex;
  align-items: center;
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

const RetweetDiv = styled.div`
  display: flex;
  align-items: center;
  /* margin-left: 35px; */
`;

const Author = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  padding: 10px;
`;

const TweetWrapper = styled.div`
  border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
  margin-left: 20px;
  margin-right: 20px;
  width: 70vw;
`;

const TweetContent = styled.div`
  padding: 10px;
`;

const TweetStatus = styled.p`
  padding: 10px 0;
`;

const Handle = styled.p`
  color: grey;
  font-size: 14px;
`;
const Date = styled.p`
  color: grey;
  font-size: 14px;
  padding: 10px 0;
`;

const Divider = styled.div`
  height: 1px;
  background: rgb(230, 236, 240);
`;

const TweetMedia = styled.img`
  width: 100%;
  border-radius: 10px;
`;

export default TweetDetails;

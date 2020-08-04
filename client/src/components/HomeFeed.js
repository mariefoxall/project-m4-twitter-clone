import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import styled from "styled-components";
import { COLORS } from "../constants";

import { CurrentUserContext } from "./CurrentUserContext";
import Tweet from "./Tweet";
import TweetActionBar from "./TweetActionBar";
import ErrorScreen from "./ErrorScreen";
import Loading from "./Loading";

const HomeFeed = () => {
  const {
    currentUser,
    status,
    currentUserProfile,
    serverError,
    setServerError,
  } = React.useContext(CurrentUserContext);
  const [homeStatus, setHomeStatus] = React.useState("loading");
  const [homeFeedArray, setHomeFeedArray] = React.useState([]);
  const [homeFeedOrder, setHomeFeedOrder] = React.useState([]);

  const [newTweetStatus, setNewTweetStatus] = React.useState("");
  const [charactersRemaining, setCharactersRemaining] = React.useState(280);

  const [errorMessage, setErrorMessage] = React.useState("");

  const tweetFeedFetch = () => {
    fetch("/api/me/home-feed")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setHomeStatus("idle");
        setHomeFeedArray(Object.values(data.tweetsById));
        setHomeFeedOrder(data.tweetIds);
        setServerError(false);
      })
      .catch((err) => {
        console.log("something's wrong, dummy!", err);
        setServerError(true);
        setErrorMessage("Please refresh the page to try again.");
      });
  };

  const [needNewFetch, setNeedNewFetch] = React.useState(false);

  React.useEffect(() => {
    tweetFeedFetch();
  }, [needNewFetch]);

  const handlePostNewTweet = () => {
    console.log(newTweetStatus);
    fetch("/api/tweet", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        id: uuidv4(),
        author: currentUserProfile.author,
        retweetFrom: "",
        timestamp: new Date(),
        isLiked: false,
        isRetweeted: false,
        numLikes: 0,
        numRetweets: 0,
        status: newTweetStatus,
        media: [],
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setNeedNewFetch(!needNewFetch);
        setServerError(false);
        setNewTweetStatus("");
      })
      .catch((err) => {
        console.log(err);
        setServerError(true);
        setErrorMessage("We missed that! Please meow again.");
      });
  };

  const handleOnChange = (ev) => {
    setNewTweetStatus(ev.target.value);
    setCharactersRemaining(280 - newTweetStatus.length);
    console.log(newTweetStatus);
  };

  let charactersStyle = {
    color: "lightgrey",
  };
  if (charactersRemaining < 0) {
    charactersStyle = { color: "red" };
  } else if (charactersRemaining < 56) {
    charactersStyle = { color: "goldenrod" };
  }

  let meowButtonStyle = {};

  if (charactersRemaining < 0) {
    meowButtonStyle = {
      backgroundColor: "lightgrey",
    };
  }

  return (
    <>
      <HomePageAll>
        <Home>
          <h1>Home</h1>
        </Home>
        <DividerTop />
        {status === "loading" ? (
          <Loading />
        ) : (
          <>
            {serverError === true ? (
              <ErrorScreen message={errorMessage} />
            ) : (
              <InputAll>
                <Tippy content="The world needs to know your innermost thoughts.">
                  <InputDiv>
                    <Avatar
                      src={currentUserProfile.avatarSrc}
                      alt={`avatar for user @${currentUser}`}
                    />
                    <Input
                      type="text"
                      id="newTweet"
                      name="newTweet"
                      value={newTweetStatus}
                      onChange={handleOnChange}
                      placeholder="Tell me everything."
                    />
                  </InputDiv>
                </Tippy>
                <ButtonDiv>
                  <div style={charactersStyle}>{charactersRemaining}</div>
                  <MeowButton
                    style={meowButtonStyle}
                    type="submit"
                    onClick={handlePostNewTweet}
                    disabled={charactersRemaining < 0 ? true : false}
                  >
                    Meow
                  </MeowButton>
                </ButtonDiv>
              </InputAll>
            )}
            <DividerTop />
            <>
              <TweetFeed>
                {homeStatus === "loading" ? (
                  <Loading />
                ) : (
                  <div>
                    {homeFeedOrder.map((tweetId) => {
                      const thisTweet = homeFeedArray.find(
                        (tweet) => tweetId === tweet.id
                      );
                      return (
                        <TweetWrapper>
                          <Tippy content="View tweet details.">
                            <Link
                              to={`/tweet/${tweetId}`}
                              aria-label="view tweet"
                              key={tweetId}
                            >
                              <Tweet thisTweet={thisTweet} />
                            </Link>
                          </Tippy>
                          <TweetActionBar
                            thisTweet={thisTweet}
                            tweetFeedFetch={tweetFeedFetch}
                          />

                          <Divider />
                        </TweetWrapper>
                      );
                    })}
                  </div>
                )}
              </TweetFeed>
            </>
          </>
        )}
      </HomePageAll>
    </>
  );
};
const InputAll = styled.div`
  margin-left: 20px;
  &:hover {
    border: 3px solid ${COLORS.primary};
  }
`;
const TweetWrapper = styled.div`
  &:hover {
    border: 3px solid ${COLORS.primary};
  }
`;

const HomePageAll = styled.div`
  margin-right: 60px;
  border-right: 1px solid lightgrey;
`;
const TweetFeed = styled.div`
  margin-left: 20px;
  border-left: 1px solid lightgrey;
`;

const MeowButton = styled.button`
  padding: 10px 20px;
  border-radius: 25px;
  background-color: ${COLORS.primary};
  color: white;
  font-size: 20px;
  border: none;
  outline: none;

  &:hover:enabled {
    cursor: pointer;
    transform: translateY(-2px);
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
  border-left: 1px solid lightgrey;
  /* margin-left: 20px; */
`;

const Home = styled.div`
  border-left: 1px solid lightgrey;
  margin-left: 20px;
  padding: 20px;
`;
const InputDiv = styled.div`
  display: flex;
  border-left: 1px solid lightgrey;
  /* margin-left: 20px; */
`;

const Avatar = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  padding: 10px;
`;

const Divider = styled.div`
  height: 1px;
  background: rgb(230, 236, 240);
`;

const DividerTop = styled(Divider)`
  margin-left: 20px;
`;

const Input = styled.textarea`
  border: none;
  padding: 10px;
  outline: none;
  width: 100%;
  height: 150px;
`;

export default HomeFeed;

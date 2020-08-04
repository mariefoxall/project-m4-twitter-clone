import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import Notifications from "./Notifications";
import HomeFeed from "./HomeFeed";
import Bookmarks from "./Bookmarks";
import TweetDetails from "./TweetDetails";
import Profile from "./Profile";
import GlobalStyle from "./GlobalStyle";
import Sidebar from "./Sidebar";
import Loading from "./Loading";
import { CurrentUserContext } from "./CurrentUserContext";

const App = () => {
  const { currentUser, status } = React.useContext(CurrentUserContext);
  return (
    <>
      {status === "loading" ? (
        <Loading />
      ) : (
        <Router>
          <GlobalStyle />
          <Wrapper>
            <div>
              <Sidebar />
            </div>
            <div>
              <Switch>
                <Route exact path="/">
                  <HomeFeed />
                </Route>
                <Route path="/notifications">
                  <Notifications />
                </Route>
                <Route path="/bookmarks">
                  <Bookmarks />
                </Route>
                <Route path="/tweet/:tweetId">
                  <TweetDetails />
                </Route>
                <Route path="/:profileId">
                  <Profile />
                </Route>
              </Switch>
            </div>
          </Wrapper>
        </Router>
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default App;

import React from "react";
import styled from "styled-components";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { FiHome, FiUser, FiBell, FiBookmark } from "react-icons/fi";

import { ReactComponent as CatLogo } from "../assets/logo.svg";
import { NavLink } from "react-router-dom";
import { COLORS } from "../constants";
import Loading from "./Loading";

import { CurrentUserContext } from "./CurrentUserContext";

const Sidebar = () => {
  const { currentUser, status } = React.useContext(CurrentUserContext);
  console.log(currentUser);
  return (
    <>
      {status === "loading" ? (
        <Loading />
      ) : (
        <SidebarStyle>
          <CatLogo />
          <Tippy content="There's no place like home.">
            <NavLink
              exact
              to="/"
              activeStyle={{
                color: COLORS.primary,
                textDecoration: "underline",
              }}
            >
              <NavSection>
                <FiHome />
                <h2>Home</h2>
              </NavSection>
            </NavLink>
          </Tippy>
          <Tippy content="Everything you ever wanted to know about yourself.">
            <NavLink
              to={`/${currentUser}`}
              activeStyle={{
                color: COLORS.primary,
                textDecoration: "underline",
              }}
            >
              <NavSection>
                <FiUser />
                <h2>Profile</h2>
              </NavSection>
            </NavLink>
          </Tippy>
          <Tippy content="This one's just for show.">
            <NavLink
              exact
              to="/notifications"
              activeStyle={{
                color: COLORS.primary,
                textDecoration: "underline",
              }}
            >
              <NavSection>
                <FiBell />
                <h2>Notifications</h2>
              </NavSection>
            </NavLink>
          </Tippy>
          <Tippy content="This one too.">
            <NavLink
              exact
              to="/bookmarks"
              activeStyle={{
                color: COLORS.primary,
                textDecoration: "underline",
              }}
            >
              <NavSection>
                <FiBookmark /> <h2>Bookmarks</h2>
              </NavSection>
            </NavLink>
          </Tippy>
        </SidebarStyle>
      )}
    </>
  );
};

const SidebarStyle = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavSection = styled.div`
  display: flex;
  align-items: center;
`;

export default Sidebar;

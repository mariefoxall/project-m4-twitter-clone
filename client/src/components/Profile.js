import React from "react";
import { useParams, NavLink } from "react-router-dom";
import styled from "styled-components";
import { FiMapPin, FiCalendar } from "react-icons/fi";
import moment from "moment";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { COLORS } from "../constants";

import ProfileFeed from "./ProfileFeed";
import { CurrentUserContext } from "./CurrentUserContext";
import Loading from "./Loading";

const Profile = () => {
  const { currentUser, status } = React.useContext(CurrentUserContext);
  const { profileId } = useParams();
  const [thisProfile, setThisProfile] = React.useState({});
  // console.log("profile");
  const [profileStatus, setProfileStatus] = React.useState("loading");

  const [following, setFollowing] = React.useState("");

  const fetchProfile = () => {
    fetch(`/api/${profileId}/profile`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setThisProfile(data.profile);
        setProfileStatus("idle");
        setFollowing(data.profile.isBeingFollowedByYou ? "Unfollow" : "Follow");
      })
      .catch((err) => {
        console.log("something's wrong, dummy!", err);
      });
  };

  React.useEffect(() => {
    fetchProfile();
  }, [following]);

  const handleFollow = () => {
    fetch(`/api/${thisProfile.handle}/follow`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        // window.location.reload(false);
        setFollowing(!following);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUnfollow = () => {
    fetch(`/api/${thisProfile.handle}/unfollow`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        // window.location.reload(false);
        setFollowing(!following);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {profileStatus === "loading" ? (
        <Loading />
      ) : (
        <ProfilePage>
          <ProfileBanner
            src={thisProfile.bannerSrc}
            alt={`banner for user ${thisProfile.handle}`}
          />
          <AvatarDiv>
            <ProfileAvatar
              src={thisProfile.avatarSrc}
              alt={`avatar for user ${thisProfile.handle}`}
            />
          </AvatarDiv>
          <ButtonDiv>
            {thisProfile.handle !== currentUser && (
              <>
                {thisProfile.isBeingFollowedByYou ? (
                  <Tippy
                    content={`Click to ${following} ${thisProfile.displayName}`}
                  >
                    <FollowButton onClick={handleUnfollow}>
                      Unfollow
                    </FollowButton>
                  </Tippy>
                ) : (
                  <Tippy
                    content={`Click to ${following} ${thisProfile.displayName}`}
                  >
                    <FollowButton onClick={handleFollow}>Follow</FollowButton>
                  </Tippy>
                )}
              </>
            )}
          </ButtonDiv>
          <ProfileBioDiv>
            <h1>{thisProfile.displayName}</h1>
            <HandleFollow>
              <div>@{thisProfile.handle}</div>
              {thisProfile.isFollowingYou && (
                <FollowsYou>Follows you</FollowsYou>
              )}
            </HandleFollow>
            <h3>{thisProfile.bio}</h3>
            <LocationJoined>
              {thisProfile.location && (
                <LocationDiv>
                  <FiMapPin />
                  <div>{thisProfile.location}</div>
                </LocationDiv>
              )}
              {thisProfile.joined && (
                <JoinedDiv>
                  <FiCalendar />
                  <div>
                    Joined {moment(thisProfile.joined).format("MMMM YYYY")}
                  </div>
                </JoinedDiv>
              )}
            </LocationJoined>
            <FollowDiv>
              <Follow>
                <strong>{thisProfile.numFollowing}</strong> Following
              </Follow>
              <Follow>
                <strong>{thisProfile.numFollowers}</strong> Followers
              </Follow>
            </FollowDiv>
          </ProfileBioDiv>
          <ProfileFeed thisHandle={profileId} />
        </ProfilePage>
      )}
    </>
  );
};
const ProfilePage = styled.div`
  width: 90%;
  margin-left: 50px;
  border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
  position: relative;
`;
const ProfileBanner = styled.img`
  width: 100%;
  position: relative;
`;
const HandleFollow = styled.div`
  display: flex;
  margin-top: 5px;
  align-items: center;
`;

const FollowsYou = styled.p`
  background-color: lightgrey;
  padding: 4px;
  margin-left: 10px;
`;

const ProfileAvatar = styled.img`
  position: absolute;
  border-radius: 50%;
  height: 150px;
  width: 150px;
  top: -75px;
  left: 20px;
  border: 2px solid white;
`;

const AvatarDiv = styled.div`
  position: relative;
`;

const FollowButton = styled.button`
  padding: 10px 20px;
  border-radius: 25px;
  background-color: ${COLORS.primary};
  color: white;
  font-size: 20px;
  border: none;
  outline: none;
  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px 20px 0 0;
  height: 70px;
`;

const ProfileBioDiv = styled.div`
  padding: 20px;

  h3 {
    padding: 20px 0 10px;
  }
`;

const FollowDiv = styled.div`
  display: flex;
`;

const JoinedDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-right: 20px;
`;

const LocationDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-right: 20px;
`;

const Follow = styled.p`
  margin-right: 10px;
`;

const LocationJoined = styled.div`
  display: flex;
  margin: 0 0 10px -10px;
`;

export default Profile;

import React from "react";
import styled from "styled-components";
import flowers from "../assets/flowers.gif";
import { COLORS } from "../constants";

const Notifications = () => {
  return (
    <NotificationsPage>
      <Flowers>
        <Circle>
          <Words>There is nothing to see here...</Words>
        </Circle>
      </Flowers>
    </NotificationsPage>
  );
};

const NotificationsPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Flowers = styled.div`
  background-image: url(${flowers});
  background-size: cover;
  height: 80vh;
  width: 80vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 10px 20px 40px;
`;

const Circle = styled.div`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  opacity: 0.5;
  background-color: ${COLORS.primary};
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Words = styled.div`
  color: white;
  opacity: 1;
`;

export default Notifications;

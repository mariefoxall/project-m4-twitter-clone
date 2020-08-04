import React from "react";
import styled from "styled-components";
import flowers from "../assets/flowers.gif";
import { COLORS } from "../constants";

const ErrorScreen = ({ message }) => {
  return (
    <div>
      <Flowers>
        <Circle>
          <Words>OOPS! An unknown error has occurred.</Words>
          <Words>{message}</Words>
        </Circle>
      </Flowers>
    </div>
  );
};

const Flowers = styled.div`
  background-image: url(${flowers});
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
`;

const Words = styled.div`
  color: white;
  opacity: 1;
`;

export default ErrorScreen;

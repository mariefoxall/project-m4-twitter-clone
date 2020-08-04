import React from "react";
import { FiLoader } from "react-icons/fi";
import styled, { keyframes } from "styled-components";

const Loading = () => {
  return (
    <Spinner>
      <FiLoader />
    </Spinner>
  );
};

const spin = keyframes`from{
    transform: rotate(0deg)
}to{
    transform: rotate(360deg)
}`;

const Spinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${spin} 2000ms infinite;
`;

export default Loading;

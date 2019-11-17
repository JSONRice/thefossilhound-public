import React from "react";
import styled from "styled-components";
import { Image } from "react-bootstrap";

const StyledImage = styled(Image)`
  max-width: 992px;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
`;

export const AppImage = props => {
  return (
    <ImageContainer>
      <StyledImage {...props} />
    </ImageContainer>
  )
};
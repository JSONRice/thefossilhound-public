import React from "react";
import { Carousel, Image } from "react-bootstrap";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ImagePropType } from "../../consts/prop-types";

const StyledImage = styled(Image)`
  width: 100%;
  height: 800px;
`;

const StyledCarouselCaption = styled(Carousel.Caption)`
  font-family: Arial, SansSerif, serif;
  color: ${({ theme }) => theme.color.captionText};
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 25px;
  padding: 10px 15px 20px 15px;
`;

export const AppCarousel = ({ images }) => {
  return (
    <Carousel wrap={true} touch={true}>
      {images.map(image => {
        return (
          <Carousel.Item key={image.name} className="carouselItem">
            <StyledImage
              alt={image.alt ? image.alt : image.name}
              src={image.src}
              className="carouselImage"
              responsive="true"
            />
            {image.title && image.caption && (
              <StyledCarouselCaption>
                <h3>{image.title}</h3>
                <p>{image.caption}</p>
              </StyledCarouselCaption>
            )}
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

AppCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape(ImagePropType)).isRequired
};

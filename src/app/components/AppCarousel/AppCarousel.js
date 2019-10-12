import * as React from "react";
import { Carousel, Image } from "react-bootstrap";
import PropTypes from "prop-types";
import { ImagePropType } from "../../consts/prop-types";
import styled from "styled-components";

const StyledImage = styled(Image)`
  width: 100%;
  height: 800px;
`;

/**
 * Carousel that cycles through images on a timer. Each image in the array of images contains the following:
 *
 * image[0]:
 *
 * - name
 * - alt (optional)
 * - src
 * - title
 * - caption
 *
 * @param images
 * @returns {*}
 * @constructor
 */
export const AppCarousel = ({ images }) => {

  // Render the carousel with the carousel items. One item appears for each image key passed in.
  // To ensure the carousel doesn't rotate add the following attribute: interval={0}
  return (
      <Carousel wrap={true} touch={true}>
        {
          images.map(image => {
            return (
              <Carousel.Item key={image.name} className="carouselItem">
                <StyledImage
                  alt={image.alt ? image.alt : "alt"}
                  src={image.src}
                  className="carouselImage"
                  responsive="true"
                />
                {
                  image.title && image.caption && (
                    <Carousel.Caption className="carouselCaption">
                      <h3>{image.title}</h3>
                      <p>{image.caption}</p>
                    </Carousel.Caption>
                  )
                }
              </Carousel.Item>
            );
          })
        }
      </Carousel>
  );
};

AppCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape(ImagePropType)).isRequired
};

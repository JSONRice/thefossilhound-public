import PropTypes from "prop-types";

/**
 * App Global PropTypes for convenience
 */

export const ImagePropType = {
  alt: PropTypes.string,
  caption: PropTypes.string,
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
};

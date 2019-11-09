import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

class MediaQuery extends React.Component {
  static defaultProps = {
    media: "(min-width: 0px)",
    defaultMatches: true,
    onChange: () => null,
    render: () => null
  };

  state = {
    matches: this.props.defaultMatches
  };

  mql = null;

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    this.mql.removeListener(this.handleChange);
    this.mql = null;
  }

  componentDidUpdate(lastProps) {
    if (lastProps.media !== this.props.media) {
      this.init();
    }
  }

  init() {
    if (window && window.matchMedia) {
      this.mql = window.matchMedia(this.props.media);
      this.mql.addListener(this.handleChange);
      this.update(this.mql);
    } else {
      const { media, defaultMatches: matches } = this.props;
      this.update({ media, matches });
    }
  }

  handleChange = e => {
    this.update(e);
  };

  update({ matches, media }) {
    this.setState({ matches, media });
    this.props.onChange({ matches, media });
  }

  render() {
    const { matches } = this.state;
    const { render, media } = this.props;
    return render({ matches, media });
  }
}

MediaQuery.propTypes = {
  /** A media query to use for media matching */
  media: PropTypes.string,

  /** Whether it defaults to matching the `media` or not */
  defaultMatches: PropTypes.bool,

  /** Callback to execute when `media` matching changes are detected */
  onChange: PropTypes.func,

  /** Render prop for conditionally rendering content based on `media` matching */
  render: PropTypes.func
};

export default MediaQuery;

export const useMediaQuery = (
  onChange,
  media = "(min-width: 0px)",
  defaultMatches = true
) => {
  const [matches, setMatches] = useState(defaultMatches);
  const mql = useRef(null);

  useEffect(() => {
    const update = ({ matches: updateMatches }) => {
      setMatches(updateMatches);
      onChange({ matches: updateMatches, media });
    };

    if (window.matchMedia) {
      mql.current = window.matchMedia(media);
      mql.current.addListener(update);
      update(mql.current);
    } else {
      update({ matches });
    }

    return () => {
      mql.current.removeListener(update);
      mql.current = null;
    };
  }, [matches, media, onChange]);

  return [matches, media];
};
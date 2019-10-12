import * as React from 'react';
import {Col, Row} from 'react-bootstrap';
import AppCarousel from './AppCarousel';
import LinkWithTooltip from './LinkWithTooltip';

class Home extends React.Component {

  constructor(props) {
    super(props);

    // Any images that are to go into the carousel should have their keys cited here.
    // See the image registry for the key listings.
    this._carouselImageKeys = ["penndixie","calvertcliffs","sharkteeth","atlantic"];
    this._tooltipMYA =
      <LinkWithTooltip
        tooltip={<span>Million Years Ago</span>}
        href="#"
        id="tooltipMYA"
        placement="top"
        children={<span>MYA</span>}/>;
  }

  render() {
    return (
      <Row>
        <Col xs={12} md={6} lg={12} className="flex-center">
          <h2>"Celebrating the Richness of Paleontology through Fossil Hunting"</h2>
        </Col>
        <Col xs={12} md={6} lg={12} className="flex-center">
          <br/>
        </Col>
        <Col xs={12} md={6} lg={12} className="flex-center">
          <AppCarousel defaultUri={"#"} imageKeys={this._carouselImageKeys}/>
        </Col>
        <Col xs={12} md={6} lg={12} className="flex-center">
          <br/>
        </Col>
        <Col xs={12} md={6} lg={12}>
          <p className="lead">
            Welcome to <span style={{textDecoration: "underline"}}>The Paleo Guy</span>. My name is Jason. In July 2017 I moved out to Lehi, Utah with my family.
            Life has never been the same since. I'm a Software Engineer working for a consultant firm
            in Riverton. I really enjoy spending time in the great outdoors of Utah but my real passion lies
            in Paleontology or the study of ancient life. This web site was developed from the ground up and
            showcases my fossils both collected by myself, purchased, and traded. I really enjoy studying ancient
            marine life in particular from the pre-Cambrian all the way up to the Miocene (5 {this._tooltipMYA}).
            Feel free to navigate through this site and I hope you enjoy what you find.
          </p>
        </Col>
      </Row>
    );
  }
}

export default Home;
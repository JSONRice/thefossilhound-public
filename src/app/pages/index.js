import * as React from "react";
import { Col, Row } from "react-bootstrap";
import { AppCarousel } from "../components/AppCarousel";
import { LinkWithTooltip } from "../components/LinkWithTooltip";
import { Page } from "../components/Page";
import style from "styled-components";

const TopRow = style(Row)`
  display: flex;
  justify-content: center;
`;

const BottomRow = style(Col)`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  padding: 0;
`;

const BottomRowText = style.p`
  ${props => ({ theme }) => theme.fontSize(props.fontSize)};
  cursor: default;
`;

const Home = () => {
  const images = [
    {
      name: "atlantic",
      src: "/atlantic.jpg",
      title: "Atlantic Ocean from the Outer Banks",
      caption:
        "Atlantic ocean at sunrise in the summer (5:30 am). This photograph was taken on the shore of Duck beach, Outer Banks North Carolina."
    },
    {
      name: "ecphora02",
      src: "/ecphora02.jpg",
      caption:
        "Purchased from a private collector who resides in South Carolina. Acquired a steal of a deal (three Ecphora for the price of one).",
      title: "Ecphora gardnerae"
    },
    {
      name: "calvertcliffs",
      caption:
        "Calvert Cliffs is a series of sedimentary cliffs located on the western shore of the Chesapeake Bay in Maryland. The cliffs contain a set of Miocene deposits containing a rich collection of  shark, cetacean, avian, fish, gastropod, and bivalve fossils. The three formations are: St. Mary's, Choptank, and Calvert. Megalodon teeth have been found here but they are rare.",
      title: "Calvert Cliffs, Maryland",
      src: "/calvertcliffs.jpg"
    },
    {
      alt: "Penn Dixie fossil site",
      caption:
        "Penn Dixie is one of my favorite fossil sites. It's rich in Devonian history and contains the fossilized remains of brachiopods, echinoderms, cephalopods, trilobites, placoderms, and other ancient marine life. One of my favorite fossils the Eldredgeops rana is found at this special location. Browse the Trilobite page under Collections for more information.",
      name: "penndixie",
      title: "Penn Dixie fossil site",
      src: "/penndixie.jpg"
    },
    {
      alt: "Fossil shark teeth from Bakersfield, CA",
      caption:
        "An assortment of shark teeth from the Round Mountain Silt formation that formed during the Miocene 14-16 Million Years Ago. During this time Lamniformes (family of mackeral sharks) was starting to develop a branch of species known as Cosmopolitodus or Carcharodon in paritucular the C. hastalis and C. planus and it is these sharks that the modern day Great White and Mako are thought to have originated from.",
      name: "sharkteeth",
      title: "Fossil shark teeth from Bakersfield, CA",
      src: "/sharkteeth.jpg"
    }
  ];

  const _tooltipMYA = (
    <LinkWithTooltip
      tooltip={<span>Million Years Ago</span>}
      href="#"
      id="tooltipMYA"
      placement="top"
      children={<span>MYA</span>}
    />
  );

  return (
    <Page title="The Paleo Guy: Fossil Hunting, Preparation, and Discoveries...">
      <TopRow>
        <Col xs={12} md={12} lg={12} xl={12}>
          <AppCarousel defaultUri={"#"} images={images} />
        </Col>
      </TopRow>
      <BottomRow>
        <Col xs={12} md={12} lg={12} xl={12}>
          <BottomRowText fontSize={16}>
            Welcome to <span style={{ textDecoration: "underline" }}>The Paleo Guy</span>. My name is Jason. In July
            2017 I moved out to Lehi, Utah with my family. Life has never been the same since. I'm a Software Engineer
            working for a consultant firm in Riverton. I really enjoy spending time in the great outdoors of Utah but my
            real passion lies in Paleontology or the study of ancient life. This web site was developed from the ground
            up and showcases my fossils both collected by myself, purchased, and traded. I really enjoy studying ancient
            marine life in particular from the pre-Cambrian all the way up to the Miocene (5 {_tooltipMYA}). Feel free
            to navigate through this site and I hope you enjoy what you find.
          </BottomRowText>
        </Col>
      </BottomRow>
    </Page>
  );
};

export default Home;

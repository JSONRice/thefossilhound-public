import React from "react";
import styled from "styled-components";
import { Page } from "../../../components/Page";
import { Image } from "react-bootstrap";

const StyledImage = styled(Image)`
  width: 100%;
  height: 400px;
`;

const Trilobita = () => {
  return (
    <Page title="Trilobita">
      <p>
        From Wikipedia: Trilobites are a group of extinct marine arachnomorph arthropods that form the class Trilobita.
        Trilobites form one of the earliest-known groups of arthropods. The first appearance of trilobites in the fossil
        record defines the base of the Atdabanian stage of the Early Cambrian period (521 million years ago), and they
        flourished throughout the lower Paleozoic era before beginning a drawn-out decline to extinction when, during
        the Devonian, all trilobite orders except the Proetids died out. Trilobites disappeared in the mass extinction
        at the end of the Permian about 252 million years ago. The trilobites were among the most successful of all
        early animals, existing in oceans for almost 300 million years.
      </p>
      <StyledImage responsive={true} src="/Greenops_widderensis.jpg" />
    </Page>
  );
};

export default Trilobita;

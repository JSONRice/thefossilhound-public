import React from "react";
import styled from "styled-components";
import { Page } from "../../../components/Page";
import { Image } from "react-bootstrap";

const StyledImage = styled(Image)`
  width: 100%;
  height: 400px;
`;

const Chondrichthyes = () => {
  return (
    <Page title="Chondrichthyes: Sharks and Rays">
      <p>
        According to Wikipedia Chondrichthyes is a Class (nomenclature) that consists of two subclasses namely
        Elasmobranchii and Holocephali. Elasmobranchii encompasses most of the common sharks along with rays, skates,
        and sawfish that we know and love today. Holocephali includes a subclass of sharks that are referred to as
        <i>Ghost Sharks</i>. These animals differ slightly from the more common group of sharks found in Elasmobranchii.
        For the sake of clarity unless noted otherwise all the Chondrichthyes discussed herein will mainly focus on
        Chondrichthyes. We'll dive deeper into the world of Lamniformes which includes the Great White, Mako, and
        Megalodon along with other orders such as Carcharhiniformes which includes other popular Hammerhead and Sandbar.
        Dive into the world of sharks and other marine predators through the table below.
      </p>
      <StyledImage responsive="true" src="/great_white.jpg" />
    </Page>
  );
};

export default Chondrichthyes;

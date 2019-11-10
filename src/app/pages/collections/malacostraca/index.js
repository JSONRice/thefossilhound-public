import React from "react";
import styled from "styled-components";
import { Page } from "../../../components/Page";
import { Image } from "react-bootstrap";

const StyledImage = styled(Image)`
  width: 100%;
  height: 400px;
`;

const Malacostraca = () => {
  return (
    <Page title="Malacostraca: Crabs, Lobsters, and Crayfish">
      <p>
        According to Wikipedia Malacostraca is the largest of the six classes of crustaceans, containing about 40,000
        living species, divided among 16 orders. Its members, the malacostracans, display a great diversity of body
        forms and include crabs, lobsters, crayfish, shrimp, krill, woodlice, amphipods, mantis shrimp and many other,
        less familiar animals. They are abundant in all marine environments and have colonised freshwater and
        terrestrial habitats. They are segmented animals, united by a common body plan comprising 20 body segments
        (rarely 21), and divided into a head, thorax, and abdomen.
      </p>
      <StyledImage responsive="true" src="/crab.jpg" />
    </Page>
  );
};

export default Malacostraca;

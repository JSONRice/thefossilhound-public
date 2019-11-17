import React from "react";
import styled from "styled-components";
import { Page } from "../../../components/Page";
import { Image } from "react-bootstrap";
import { AppImage } from "../../../components/AppImage/AppImage";
import { Table } from "../../../components/Table";
import { SpeciesTableHeaderConstants } from "../../../utils/species-table-header-constants";
import { ColumnConfiguration } from "../../../utils/column-configuration";
import { SecondaryButton } from "../../../components/Buttons";

/**
 * (HOC) Clear button for filter bar
 */
const Clear = styled(SecondaryButton)`
  border: none;
  ${({ theme }) => theme.fontSize(11)};
  line-height: 0;
  background-color: transparent !important;
  color: ${({ theme }) => theme.color.gray1000};
  &:hover {
    color: ${({ theme }) => theme.color.blue800};
    text-decoration: underline;
  }
`;

let Filter = styled.div`
  display: flex;
  & * {
    margin-left: 10px;
    margin-top: 10px;
  }
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 400px;
`;

let trilobitaDirectory = [
  {
    kingdom: "Animalia",
    phylum: "Arthropoda",
    class: "Trilobita",
    order: "Phacopida",
    family: "Acastidae",
    genus: "Bellacartwrightia",
    species: "Bellacartwrightia sp.",
    link: "/collections/trilobita/bellacartwrightia-sp"
  },
  {
    kingdom: "Animalia",
    phylum: "Arthropoda",
    class: "Trilobita",
    order: "Ptychopariida",
    family: "Alokistocaridae",
    genus: "Elrathia",
    species: "E. kingii",
    link: "/collections/trilobita/elrathia-kingii"
  },
  {
    kingdom: "Animalia",
    phylum: "Arthropoda",
    class: "Trilobita",
    order: "Ptychopariida",
    family: "Marjumiidae",
    genus: "Modocia",
    species: "M. typicallis",
    link: "/collections/trilobita/modocia_typicallis"
  },
  {
    kingdom: "Animalia",
    phylum: "Arthropoda",
    class: "Trilobita",
    order: "Phacopida",
    family: "Phacopidae",
    genus: "Eldredgeops",
    species: "E. rana",
    link: "/collections/trilobita/eldredgeops-rana"
  }
];

const Container = styled.div`
  width: 100%;
  height: 400px;
`;


// Table Configuration
let columns = new ColumnConfiguration({
  desktop: [...SpeciesTableHeaderConstants.desktop],
  tablet: [...SpeciesTableHeaderConstants.tablet],
  mobile: [...SpeciesTableHeaderConstants.mobile]
});

const Trilobita = () => {

  const renderFilterDropdown = (title = "Filter", dataset, key, filter) => {
    return (
      <div>
        <label htmlFor="filterCriteria">{title}</label>
        <select id="filterCriteria" onChange={e => filter(e.currentTarget.value, key)}>
          <option
            value=""
            key={`${key}-filter-all`}
          >
            All
          </option>
          {
            dataset.map(tuple => {
              return (
                <option
                  value={tuple}
                  key={`order-filter-${tuple}`}
                >
                  {tuple}
                </option>
              )
            })
          }
        </select>
      </div>
    )
  };

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
      <AppImage responsive="true" src="/Greenops_widderensis.jpg" />
      <Container>
        <Table
          data={trilobitaDirectory}
          defaultSortType="string"
          defaultSortKey="class"
          defaultSortAsc={true}
          columnConfiguration={columns.desktop}
          tabletOverrideColumnConfiguration={columns.tablet}
          mobileOverrideColumnConfiguration={columns.mobile}
        >
          {({ clear, filter }) => {

            const orders = [...new Set(trilobitaDirectory.map(trilobite => trilobite.order))];
            const families = [...new Set(trilobitaDirectory.map(trilobite => trilobite.family))];

            return (
              <>
                <Filter>
                  <div>
                    <input type="text" placeholder="Search..." onChange={e => filter(e.currentTarget.value)} />
                  </div>
                  {renderFilterDropdown("Order", orders, "order", filter)}
                  {renderFilterDropdown("Families", families, "family", filter)}
                  <Clear onClick={clear}>Clear</Clear>
                </Filter>
              </>
            );
          }}
        </Table>
      </Container>
    </Page>
  );
};

export default Trilobita;

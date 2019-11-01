import React from "react";
import { Page } from "../../components/Page";
import { LocalLink } from "../../components/LocalLink";
import { formatCurrency, formatCurrencyWithSymbol } from "../../utils/formatters";
import { getLocale } from "../../utils/initialization";
import { Banner } from "../../components/Banner";
import { PrimaryButton, SecondaryButton } from "../../components/Buttons";
import styled from "styled-components";

const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;

  > *:not(:last-child) {
    margin-bottom: 15px;
  }
`;

const ProofOfConcept = () => (
  <Page title="Proof of Concept">
    <LocalLink href={"/transfers"}>transfers</LocalLink>

    <br />
    <div>{`Current Locale: ${getLocale()}`}</div>
    <h1>Currencies</h1>
    <div>USD currency amount</div>
    <div>{formatCurrency(123.12, "USD")}</div>
    <div>{formatCurrency(123.1, "USD")}</div>
    <div>{formatCurrency(123, "USD")}</div>
    <br />
    <div>USD currency amount symbol</div>
    <div>{formatCurrencyWithSymbol(123.12, "USD")}</div>
    <div>{formatCurrencyWithSymbol(123.1, "USD")}</div>
    <div>{formatCurrencyWithSymbol(123, "USD")}</div>
    <br />
    <div>BHD currency amount</div>
    <div>{formatCurrency(123.123, "BHD")}</div>
    <div>{formatCurrency(123.1, "BHD")}</div>
    <div>{formatCurrency(123, "BHD")}</div>
    <br />
    <div>FOO currency amount</div>
    <div>{formatCurrency(123.123, "BHD")}</div>
    <div>{formatCurrency(123.1, "BHD")}</div>
    <div>{formatCurrency(123, "BHD")}</div>
    <br />
    <div>BOO currency amount</div>
    <div>{formatCurrency(123.123, "BHD")}</div>
    <div>{formatCurrency(123.1, "BHD")}</div>
    <div>{formatCurrency(123, "BHD")}</div>
    <br />
    <div>ZOO currency amount</div>
    <div>{formatCurrency(123.123, "BHD")}</div>
    <div>{formatCurrency(123.1, "BHD")}</div>
    <div>{formatCurrency(123, "BHD")}</div>

    <Buttons>
      <PrimaryButton disabled={false} onClick={() => alert("Default Primary Button clicked")}>
        Default Primary Button
      </PrimaryButton>
      <PrimaryButton disabled={true} onClick={() => alert("Default Disabled Primary Button clicked")}>
        Disabled Primary Button
      </PrimaryButton>

      <SecondaryButton disabled={false} onClick={() => alert("Default Secondary Button clicked")}>
        Default Secondary Button
      </SecondaryButton>
      <SecondaryButton disabled={true} onClick={() => alert("Default Secondary Button clicked")}>
        Disabled Secondary Button
      </SecondaryButton>
    </Buttons>

    <Banner type="info" title="No Data Available">
      No Dashboard Data
    </Banner>
    <Banner type="success" title="Great Success">
      Mission was a success. That's a wrap folks.
    </Banner>

    <Banner type="warning" title="Warning Effective">
      Looks like you've been warned. Proceed with caution.
    </Banner>

    <Banner type="error" title="Error!">
      Something went drastically wrong! Please notify the developers!
    </Banner>
  </Page>
);

export default ProofOfConcept;

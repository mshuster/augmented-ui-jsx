import * as React from "react";
import { Augmented } from "../../src/augmented";
import "reset-css";
import "augmented-ui/augmented.css";
import "./styles.css";
import styled, { ThemeProvider } from "styled-components";
export default { title: "Augmented" };

const Layout = styled.div`
  padding: 2rem;
`;

export const withAugmented = () => (
  <>
    <Augmented aug-border="3px" aug-border-bg="#cc0000">
      <Layout>test</Layout>
    </Augmented>

    <ThemeProvider
      theme={{
        "aug-border": "3px",
        "aug-border-bg": "grey",
        "aug-size": { b: "5px" },
      }}
    >
      <Augmented
        aug-clip-x={{ b: true, t: true }}
        aug-round={{ br: true }}
        aug-size={{ b: "10px",t:"20px" }}
        aug-width={{b: "33%", t:"50px"}}
        aug-height={{b: "10px", t: "5px"}}
      >
        <Layout>test</Layout>
      </Augmented>
    </ThemeProvider>

    <Augmented as="button" aug-border="3px" aug-border-bg="#cc0000">
      <Layout>test</Layout>
    </Augmented>

    <Augmented
      as="input"
      placeholder="hello"
      aug-border="3px"
      aug-border-bg="#cc0000"
      aug-round={{ tl: true, br: true }}
    />
  </>
);

export const augmentedClipTests = () => (
  <ThemeProvider theme={{ "aug-border": "3px", "aug-border-bg": "grey" }}>
    <Augmented aug-clip={{ tl: true }}>tl-clip</Augmented>
    <Augmented aug-clip={{ t: true }}>t-clip</Augmented>
    <Augmented aug-clip={{ tr: true }}>tr-clip</Augmented>
    <Augmented aug-clip={{ r: true }}>r-clip</Augmented>
    <Augmented aug-clip={{ br: true }}>br-clip</Augmented>
    <Augmented aug-clip={{ b: true }}>b-clip</Augmented>
    <Augmented aug-clip={{ bl: true }}>bl-clip</Augmented>
    <Augmented aug-clip={{ l: true }}>l-clip</Augmented>
  </ThemeProvider>

  // <div augmented-ui="tl-clip exe" style="--aug-tl: 8px;">tl-clip<br>--aug-tl</div>
  // <div augmented-ui="t-clip exe" style="--aug-t: 8px;">t-clip<br>--aug-t</div>
  // <div augmented-ui="tr-clip exe" style="--aug-tr: 8px;">tr-clip<br>--aug-tr</div>
  // <div augmented-ui="r-clip exe" style="--aug-r: 8px;">r-clip<br>--aug-r</div>
  // <div augmented-ui="br-clip exe" style="--aug-br: 8px;">br-clip<br>--aug-br</div>
  // <div augmented-ui="b-clip exe" style="--aug-b: 8px;">b-clip<br>--aug-b</div>
  // <div augmented-ui="bl-clip exe" style="--aug-bl: 8px;">bl-clip<br>--aug-bl</div>
  // <div augmented-ui="l-clip exe" style="--aug-l: 8px;">l-clip<br>--aug-l</div>
);

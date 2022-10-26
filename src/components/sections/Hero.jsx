import React from "react";

import styled from "@emotion/styled";

import { color, unit } from "../../styles";

const HeroWrapper = styled.div({
  height: unit(30),
  backgroundColor: color.brand,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const HeroText = styled.h1({
  fontFamily: "D2Coding, monospace",
  fontSize: unit(4),
  color: color.background,
  textAlign: "center",
});

function Hero({ text }) {
  return (
    <HeroWrapper>
      <HeroText>{text}</HeroText>
    </HeroWrapper>
  );
}

export default Hero;

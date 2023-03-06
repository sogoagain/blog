import React from "react";

import styled from "@emotion/styled";

import { color, unit } from "../../styles";

const HeroWrapper = styled.div({
  height: unit(20),
  backgroundColor: color.background,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const HeroText = styled.h1({
  fontFamily: "D2Coding, monospace",
  fontSize: unit(4),
  color: color.brand,
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

import React from "react";

import styled from "@emotion/styled";

const HeroText = styled.h1({
  fontFamily: "monospace",
});

function Hero({ text }) {
  return <HeroText>{text}</HeroText>;
}

export default Hero;

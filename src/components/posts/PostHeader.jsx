import React from "react";

import styled from "@emotion/styled";

import PostTitle from "./PostTitle";

import { yyyyMMddToISOString } from "../../utils";

import { unit, color } from "../../styles";

const HeaderWrapper = styled.header({
  padding: unit(2),
  marginBottom: unit(6),
  textAlign: "center",
});

const SubTitle = styled.h2({
  marginBottom: unit(1),
  color: color.secondary,
});

const Time = styled.time({
  color: color.secondary,
});

export default function PostHeader({ title, subtitle, date }) {
  return (
    <HeaderWrapper>
      <PostTitle>{title}</PostTitle>
      {subtitle && <SubTitle>{subtitle}</SubTitle>}
      {date && <Time dateTime={yyyyMMddToISOString(date)}>{date}</Time>}
    </HeaderWrapper>
  );
}

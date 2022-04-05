import React from "react";

import styled from "@emotion/styled";

import Anchor from "./Anchor";

import { unit, color } from "../styles/styles";

const ListItem = styled.li({
  display: "flex",
  marginBottom: unit(4),
});

const Time = styled.time({
  fontSize: unit(1.75),
  color: color.secondary,
});

const Title = styled.h2({
  marginBottom: unit(0.5),
});

const SubTitle = styled.p({
  fontSize: unit(2),
  color: color.secondary,
});

export default function PostItem({ title, subtitle, date, to }) {
  const datetime = new Date(date).toISOString();

  return (
    <ListItem>
      <Anchor to={to}>
        <Time dateTime={datetime}>{date}</Time>
        <Title>{title}</Title>
        <SubTitle>{subtitle}</SubTitle>
      </Anchor>
    </ListItem>
  );
}

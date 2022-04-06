import React from "react";

import styled from "@emotion/styled";

import Anchor from "../Anchor";

import { unit, color } from "../../styles";

const ListItem = styled.li({
  display: "flex",
  marginBottom: unit(4),
});

const Time = styled.time({
  color: color.secondary,
  fontSize: unit(1.75),
});

const Title = styled.h2({
  marginBottom: unit(0.5),
});

const SubTitle = styled.p({
  color: color.secondary,
  fontSize: unit(2),
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

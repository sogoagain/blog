import React from "react";

import styled from "@emotion/styled";

import Anchor from "../Anchor";

import { yyyyMMddToISOString } from "../../utils";

import { unit, color } from "../../styles";

const ListItem = styled.li`
  display: "flex";
  margin-bottom: ${unit(4)};
  &:last-child {
    margin-bottom: 0;
  }
`;

const Time = styled.time({
  color: color.secondary,
  fontSize: unit(1.75),
});

const Title = styled.h2({
  fontSize: unit(2.5),
  margin: `${unit(0.5)} 0 ${unit(1)} 0`,
});

const SubTitle = styled.p({
  color: color.secondary,
});

export default function PostItem({ title, subtitle, date, to }) {
  return (
    <ListItem>
      <Anchor to={to}>
        <Time dateTime={yyyyMMddToISOString(date)}>{date}</Time>
        <Title>{title}</Title>
        <SubTitle>{subtitle}</SubTitle>
      </Anchor>
    </ListItem>
  );
}

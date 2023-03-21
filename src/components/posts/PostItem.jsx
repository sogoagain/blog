import React from "react";

import styled from "@emotion/styled";

import Anchor from "../Anchor";

import { yyyyMMddToISOString } from "../../utils";

const ListItem = styled.li`
  margin: 0 15px 10px;
`;

export default function PostItem({ title, date, to }) {
  return (
    <ListItem>
      <small>
        <time dateTime={yyyyMMddToISOString(date)}>{date}</time>
      </small>
      <br />
      <Anchor to={to}>{title}</Anchor>
    </ListItem>
  );
}

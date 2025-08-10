import React from "react";

import styled from "@emotion/styled";

import Anchor from "../Anchor";
import DateTime from "../DateTime";

const ListItem = styled.li`
  margin: 0 0 1rem;
`;

export default function PostItem({ title, date, to }) {
  return (
    <ListItem>
      <DateTime dateTime={date} />
      <br />
      <Anchor to={to}>{title}</Anchor>
    </ListItem>
  );
}

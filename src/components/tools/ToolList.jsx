import React from "react";

import styled from "@emotion/styled";

import Anchor from "../Anchor";
import UnstyledOrderedList from "../UnstyledOrderedList";

const ListItem = styled.li`
  margin: 0 0 1rem;
`;

export default function ToolList({ tools }) {
  return (
    <UnstyledOrderedList>
      {tools.map(({ title, description, link }) => (
        <ListItem key={link}>
          <Anchor href={link}>{title}</Anchor>
          <br />
          <small>{description}</small>
        </ListItem>
      ))}
    </UnstyledOrderedList>
  );
}

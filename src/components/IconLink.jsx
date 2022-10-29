import React from "react";

import styled from "@emotion/styled";

import Anchor from "./Anchor";
import IconImage from "./IconImage";

import { unit } from "../styles";

const AnchorWrapper = styled(Anchor)`
  margin: 0 ${unit(1)};
`;

export default function IconLink({ link, hrefFn, toFn, title, icon, blank }) {
  const href = hrefFn ? hrefFn(link) : null;
  const to = toFn ? toFn(link) : null;

  if (blank) {
    return (
      <AnchorWrapper href={href} to={to} target="_blank" rel="noreferrer">
        <IconImage src={icon.src} alt={title} level={icon.level} />
      </AnchorWrapper>
    );
  }

  return (
    <AnchorWrapper href={href} to={to}>
      <IconImage src={icon.src} alt={title} level={icon.level} />
    </AnchorWrapper>
  );
}

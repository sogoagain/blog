import React from "react";

import styled from "@emotion/styled";

import Anchor from "./Anchor";
import IconImage from "./IconImage";

import { unit } from "../styles/styles";

const LinkWrapper = styled(Anchor)`
  margin: 0 ${unit(1)};
`;

export default function SocialLink({ link, href, to, title, icon, blank }) {
  if (blank) {
    return (
      <LinkWrapper
        href={href ? href(link) : null}
        to={to ? to(link) : null}
        target="_blank"
        rel="noreferrer"
      >
        <IconImage src={icon} alt={title} level={2} />
      </LinkWrapper>
    );
  }

  return (
    <LinkWrapper href={href ? href(link) : null} to={to ? to(link) : null}>
      <IconImage src={icon} alt={title} level={2} />
    </LinkWrapper>
  );
}

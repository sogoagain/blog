import React from "react";

import styled from "@emotion/styled";

import { GatsbyImage } from "gatsby-plugin-image";

import { toISOString } from "../../utils";

const ListItem = styled.li`
  padding: 2rem 0;
  border-bottom: 1px dashed grey;
  &:first-of-type {
    padding-top: 0;
  }
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export default function Photo({
  image,
  title,
  info: {
    dateTimeOriginal,
    cameraModel,
    lensModel,
    iso,
    focalLength,
    aperture,
    shutterSpeed,
  },
}) {
  return (
    <ListItem key={title}>
      <small>
        <time dateTime={toISOString(dateTimeOriginal)}>{dateTimeOriginal}</time>
      </small>
      <br />
      {title}
      <GatsbyImage image={image} alt={title} />
      <small>
        {cameraModel} · {lensModel} · ISO
        {iso} · {focalLength}mm · F{aperture} · {shutterSpeed}
      </small>
    </ListItem>
  );
}

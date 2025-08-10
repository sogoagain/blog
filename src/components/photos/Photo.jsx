import React from "react";

import { GatsbyImage } from "gatsby-plugin-image";
import styled from "@emotion/styled";

import DateTime from "../DateTime";
import DividedListItem from "../DividedListItem";

const BorderlessImage = styled(GatsbyImage)`
  margin-bottom: 0.5rem;
  img {
    border: none;
  }
`;

const CameraInfo = styled.span`
  color: grey;
`;

export default function Photo({
  image,
  info: {
    title,
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
    <DividedListItem key={title}>
      <DateTime dateTime={dateTimeOriginal} />
      <BorderlessImage image={image} alt={title} />
      <div>{title}</div>
      <CameraInfo>
        {cameraModel} · {lensModel} · ISO
        {iso} · {focalLength}mm · F{aperture} · {shutterSpeed}
      </CameraInfo>
    </DividedListItem>
  );
}

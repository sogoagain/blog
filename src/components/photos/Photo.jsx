import React from "react";

import { GatsbyImage } from "gatsby-plugin-image";

import DividedListItem from "../DividedListItem";

import { toISOString } from "../../utils";

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
    <DividedListItem key={title}>
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
    </DividedListItem>
  );
}

import React from "react";

import styled from "@emotion/styled";

import { graphql, useStaticQuery } from "gatsby";
import { getImage } from "gatsby-plugin-image";

import Photo from "../components/photos/Photo";

const List = styled.ol`
  list-style: none;
  padding-left: 0;
`;

const query = graphql`
  query {
    allFile(
      filter: { relativeDirectory: { eq: "photos" } }
      sort: { fields: { dateTimeOriginal: DESC } }
    ) {
      edges {
        node {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: CONSTRAINED)
          }
          name
          fields {
            cameraModel
            lensModel
            iso
            focalLength
            aperture
            shutterSpeed
            dateTimeOriginal
          }
        }
      }
    }
  }
`;

export default function PhotosContainer() {
  const {
    allFile: { edges },
  } = useStaticQuery(query);

  return (
    <List>
      {edges.map(({ node }) =>
        Photo({
          image: getImage(node.childImageSharp.gatsbyImageData),
          title: node.name,
          info: node.fields,
        }),
      )}
    </List>
  );
}

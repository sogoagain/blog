import React from "react";

import { graphql, useStaticQuery } from "gatsby";
import { getImage } from "gatsby-plugin-image";

import Photo from "../components/photos/Photo";
import UnstyledOrderedList from "../components/UnstyledOrderedList";

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
    <UnstyledOrderedList>
      {edges.map(({ node }) =>
        Photo({
          image: getImage(node.childImageSharp.gatsbyImageData),
          title: node.name,
          info: node.fields,
        }),
      )}
    </UnstyledOrderedList>
  );
}

const photoListQuery = {
  allFile: {
    edges: [
      {
        node: {
          childImageSharp: {
            gatsbyImageData: {
              images: {
                fallback: { src: "mocked-image-src.jpg" },
              },
              layout: "constrained",
              width: 600,
              height: 400,
            },
          },
          fields: {
            title: "Image 2",
            cameraModel: "Canon EOS R",
            lensModel: "RF24-105mm F4-7.1 IS STM",
            iso: "200",
            focalLength: "105",
            aperture: "7.1",
            shutterSpeed: "1/800s",
            dateTimeOriginal: "2024.08.17",
          },
        },
      },
      {
        node: {
          childImageSharp: {
            gatsbyImageData: {
              images: {
                fallback: { src: "mocked-image-src.jpg" },
              },
              layout: "constrained",
              width: 600,
              height: 400,
            },
          },
          fields: {
            title: "Image 1",
            cameraModel: "Nikon Z50",
            lensModel: "NIKKOR Z DX 16-50mm f/3.5-6.3 VR",
            iso: "100",
            focalLength: "50",
            aperture: "6.3",
            shutterSpeed: "1/640s",
            dateTimeOriginal: "2024.08.16",
          },
        },
      },
    ],
  },
};

export default photoListQuery;

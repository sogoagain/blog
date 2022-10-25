import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { graphql, useStaticQuery } from "gatsby";

import styled from "@emotion/styled";

import Header from "../components/sections/Header";

import { loadProfileImageSrc } from "../features/profileSlice";

import { unit } from "../styles";

const HeaderSection = styled.div({
  position: "sticky",
  padding: `${unit(1)} ${unit(2)}`,
  backdropFilter: `blur(${unit(0.4)})`,
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  top: 0,
  zIndex: 1,
});

const query = graphql`
  query {
    site {
      siteMetadata {
        title
        social {
          github
        }
      }
    }
  }
`;

export default function HeaderContainer() {
  const {
    site: {
      siteMetadata: {
        title,
        social: { github },
      },
    },
  } = useStaticQuery(query);

  const dispatch = useDispatch();
  const {
    image: { src },
  } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(loadProfileImageSrc(github));
  }, []);

  return (
    <HeaderSection>
      <Header
        title={{
          text: title,
          to: "/",
        }}
        profileImage={{
          alt: "프로필 이미지",
          src,
        }}
        about={{
          text: "소개",
          to: "/about",
        }}
      />
    </HeaderSection>
  );
}

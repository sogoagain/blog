import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { graphql, useStaticQuery } from "gatsby";

import styled from "@emotion/styled";

import Header from "../components/sections/Header";

import { loadProfileImageSrc } from "../features/profileSlice";

import { unit } from "../styles";

import ProfileImage from "../images/profile.png";

const HeaderSection = styled.div({
  position: "sticky",
  padding: `${unit(1)} ${unit(2)}`,
  backdropFilter: `blur(${unit(0.4)})`,
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  top: 0,
});

const query = graphql`
  query {
    site {
      siteMetadata {
        title
        social {
          github
        }
        link {
          about
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
        link: { about },
      },
    },
  } = useStaticQuery(query);

  const dispatch = useDispatch();
  const { image } = useSelector((state) => state.profile);

  const [profileImage, setProfileImage] = useState(ProfileImage);

  useEffect(() => {
    if (image.src) {
      setProfileImage(image.src);
    }
  }, [image]);

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
          src: profileImage,
        }}
        about={{
          text: "소개",
          href: about,
        }}
      />
    </HeaderSection>
  );
}

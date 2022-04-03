import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { graphql, useStaticQuery } from "gatsby";

import styled from "@emotion/styled";

import Header from "../components/Header";

import { loadProfileImageSrc } from "../features/profileSlice";

import { unit } from "../styles/styles";

import ProfileImage from "../images/profile.png";

const HeaderSection = styled.header({
  padding: unit(3),
  backdropFilter: `blur(${unit(0.4)})`,
  position: "sticky",
  top: 0,
});

export default function HeaderContainer() {
  const { site } = useStaticQuery(graphql`
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
  `);

  const dispatch = useDispatch();
  const { image } = useSelector((state) => state.profile);

  const [profileImage, setProfileImage] = useState(ProfileImage);

  useEffect(() => {
    if (image.src) {
      setProfileImage(image.src);
    }
  }, [image]);

  useEffect(() => {
    dispatch(loadProfileImageSrc(site.siteMetadata.social.github));
  }, []);

  return (
    <HeaderSection>
      <Header
        title={{
          text: site.siteMetadata.title,
          to: "/",
        }}
        profileImage={{
          alt: "프로필 이미지",
          src: profileImage,
        }}
        about={{
          text: "소개",
          to: "/about",
        }}
      />
    </HeaderSection>
  );
}

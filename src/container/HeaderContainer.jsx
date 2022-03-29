import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { graphql, useStaticQuery } from "gatsby";

import Header from "../components/Header";

import { loadProfileImageSrc } from "../features/profileSlice";

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

  useEffect(() => {
    dispatch(loadProfileImageSrc(site.siteMetadata.social.github));
  }, []);

  return (
    <Header
      title={{
        text: site.siteMetadata.title,
        to: "/",
      }}
      profileImage={{
        alt: "sogoagain의 Github 프로필 이미지",
        src: image.src,
      }}
      about={{
        text: "소개",
        to: "/about",
      }}
    />
  );
}

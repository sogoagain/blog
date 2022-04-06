import React from "react";

import styled from "@emotion/styled";

import PostHeader from "./PostHeader";
import PostContent from "./PostContent";

import { unit } from "../../styles";

const PostWrapper = styled.article({
  padding: unit(2),
  margin: "0 auto",
});

export default function Post({ title, subtitle, date, html }) {
  return (
    <PostWrapper>
      <PostHeader title={title} subtitle={subtitle} date={date} />
      <PostContent html={html} />
    </PostWrapper>
  );
}

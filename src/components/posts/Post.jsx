import React from "react";

import styled from "@emotion/styled";

import PostHeader from "./PostHeader";
import PostStyle from "./PostStyle";

import { unit } from "../../styles";

const PostWrapper = styled.div({
  marginBottom: unit(8),
});

export default function Post({ title, subtitle, date, html }) {
  return (
    <PostWrapper>
      <PostHeader title={title} subtitle={subtitle} date={date} />
      <PostStyle html={html} />
    </PostWrapper>
  );
}

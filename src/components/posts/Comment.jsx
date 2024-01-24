import React from "react";

import styled from "@emotion/styled";

import Giscus from "@giscus/react";

const Wrapper = styled.div`
  margin: 2rem 0 1rem 0;
`;

export default function Comment({ giscus }) {
  return (
    <Wrapper>
      <Giscus
        id="comments"
        repo={giscus.repo}
        repoId={giscus.repoId}
        category={giscus.category}
        categoryId={giscus.categoryId}
        mapping={giscus.mapping}
        strict="0"
        reactionsEnabled="0"
        emitMetadata="0"
        inputPosition="top"
        theme={giscus.theme}
        lang="ko"
      />
    </Wrapper>
  );
}

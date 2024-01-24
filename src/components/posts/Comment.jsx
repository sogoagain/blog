import React from "react";

import Giscus from "@giscus/react";

export default function Comment({ giscus }) {
  return (
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
  );
}

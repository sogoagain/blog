import React from "react";

import LayoutContainer from "../container/LayoutContainer";
import ReadingListContainer from "../container/ReadingListContainer";
import SeoContainer from "../container/SeoContainer";

export default function BooksPage({ location }) {
  return (
    <LayoutContainer>
      <SeoContainer title="독서목록" pathname={location.pathname} />
      <h1>독서목록</h1>
      <ReadingListContainer />
    </LayoutContainer>
  );
}

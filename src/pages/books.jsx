import React from "react";

import LayoutContainer from "../container/LayoutContainer";
import SeoContainer from "../container/SeoContainer";
import BooksContainer from "../container/BooksContainer";
import BooksKeywordListContainer from "../container/BooksKeywordListContainer";

export default function BooksPage({ location }) {
  return (
    <LayoutContainer location={location}>
      <SeoContainer title="독서" pathname={location.pathname} />
      <h1>독서</h1>
      <BooksKeywordListContainer />
      <hr />
      <BooksContainer />
    </LayoutContainer>
  );
}

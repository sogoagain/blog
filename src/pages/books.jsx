import React from "react";

import LayoutContainer from "../container/LayoutContainer";
import BooksContainer from "../container/BooksContainer";
import SeoContainer from "../container/SeoContainer";

export default function BooksPage({ location }) {
  return (
    <LayoutContainer location={location}>
      <SeoContainer title="독서" pathname={location.pathname} />
      <h1>독서</h1>
      <hr />
      <BooksContainer />
    </LayoutContainer>
  );
}

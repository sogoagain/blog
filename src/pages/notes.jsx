import React from "react";

import LayoutContainer from "../container/LayoutContainer";
import SeoContainer from "../container/SeoContainer";
import NotesContainer from "../container/NotesContainer";

export default function NotePage({ location }) {
  return (
    <LayoutContainer>
      <SeoContainer title="노트" pathname={location.pathname} />
      <h1>노트</h1>
      <NotesContainer />
    </LayoutContainer>
  );
}

import React from "react";

import LayoutContainer from "../container/LayoutContainer";
import PhotosContainer from "../container/PhotosContainer";
import SeoContainer from "../container/SeoContainer";

function PhotoPage({ location }) {
  return (
    <LayoutContainer location={location}>
      <SeoContainer title="사진" pathname={location.pathname} />
      <h1>사진</h1>
      <hr />
      <PhotosContainer />
    </LayoutContainer>
  );
}

export default PhotoPage;

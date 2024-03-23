import React from "react";

import Anchor from "../Anchor";

export default function BookReview({ review, siteUrl }) {
  if (review.href) {
    const url = new URL(review.href);
    if (url.origin === siteUrl) {
      return <Anchor to={url.pathname}>{review.text}</Anchor>;
    }
    return <Anchor href={review.href}>{review.text}</Anchor>;
  }
  return review.text;
}

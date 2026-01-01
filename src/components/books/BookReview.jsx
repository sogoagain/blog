import React from "react";

import Anchor from "../Anchor";

export default function BookReview({ review, siteUrl }) {
  if (review.href) {
    try {
      const url = new URL(review.href);
      if (url.origin === siteUrl) {
        return <Anchor to={url.pathname}>{review.text}</Anchor>;
      }
    } catch {
      // 잘못된 URL 형식이면 외부 링크로 처리
    }
    return <Anchor href={review.href}>{review.text}</Anchor>;
  }
  return review.text;
}

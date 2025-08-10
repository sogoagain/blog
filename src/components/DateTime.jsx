import React from "react";

import { toISOString } from "../utils";

export default function DateTime({ dateTime }) {
  return (
    <small>
      <time dateTime={toISOString(dateTime)}>
        {dateTime.replace(/-/g, ".")}
      </time>
    </small>
  );
}

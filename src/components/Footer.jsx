import React from "react";

export default function Footer({ title }) {
  const year = new Date().getFullYear();

  return (
    <footer>
      {title} &copy;{year}
    </footer>
  );
}

import React from "react";

import Anchor from "../Anchor";

export default function Footer({ title, links }) {
  const year = new Date().getFullYear();

  const linkList = [];

  for (let i = 0; i < links.length; i += 1) {
    const { text, href, to } = links[i];
    linkList.push(
      <Anchor key={href} href={href} to={to}>
        {text}
      </Anchor>
    );
    if (i < links.length - 1) {
      linkList.push(<span key={`separator-${i}`}> | </span>);
    }
  }

  return (
    <footer role="contentinfo">
      <span>
        <Anchor to="#">↑ 처음으로</Anchor>
        <br />
        <br />
      </span>
      <small>
        {linkList}
        <br />
        <br />
        <Anchor href="https://git.sr.ht/~bt/barf">barf</Anchor>의 디자인을
        기반으로 제작하였습니다.
        <br />
        컨텐츠의 라이선스는{" "}
        <Anchor href="https://creativecommons.org/licenses/by/4.0/deed.ko">
          CC-BY
        </Anchor>{" "}
        입니다.
        <br />
        <Anchor href="https://github.com/sogoagain/blog">코드</Anchor>의
        라이선스는{" "}
        <Anchor href="https://github.com/sogoagain/blog/blob/main/LICENSE">
          MIT
        </Anchor>{" "}
        입니다.
        <br />
        <span>
          {title} &copy;{year}
        </span>
      </small>
    </footer>
  );
}

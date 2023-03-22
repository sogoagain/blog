import React from "react";

import Anchor from "../Anchor";

export default function Footer({ title, links }) {
  const linkList = links.flatMap(({ text, href }, i) => [
    <Anchor key={`${href}-anchor`} href={href}>
      {text}
    </Anchor>,
    i < links.length - 1 ? <span key={`${href}-separator`}> | </span> : null,
  ]);

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
          {title} &copy;{new Date().getFullYear()}
        </span>
      </small>
    </footer>
  );
}

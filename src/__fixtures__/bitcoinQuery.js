const bitcoinQuery = {
  markdownRemark: {
    frontmatter: {
      title: "비트코인",
    },
    html: '<p><em>Pay my respects to <a href="https://bitcoin.org/bitcoin.pdf">Satoshi Nakamoto</a></em></p>\n<h2>기여</h2>\n<ul>\n<li><a href="https://github.com/bitcoin/bitcoin">Bitcoin Core</a>: <a href="https://github.com/bitcoin/bitcoin/blob/master/doc/release-notes/release-notes-23.0.md">version 23.0</a>, <a href="https://github.com/bitcoin/bitcoin/blob/master/doc/release-notes/release-notes-24.0.1.md">version 24.0.1</a></li>\n<li><a href="https://mempool.space/">mempool.space</a>: 한국어 번역</li>\n<li><a href="https://github.com/damus-io/damus">Damus</a>: 한국어 번역</li>\n</ul>',
  },
};

export default bitcoinQuery;

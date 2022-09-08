const siteQuery = {
  site: {
    siteMetadata: {
      title: "SOGOAGAIN",
      social: {
        github: "sogoagain",
        twitter: "sogoagain",
        email: "imyong0@gmail.com",
      },
      link: {
        rss: "/rss.xml",
        about:
          "https://sogoagain.notion.site/About-599f1c0b47314c30800c706265b0a7bd",
      },
      utterances: {
        src: "https://utteranc.es/client.js",
        repo: "sogoagain/blog-comments",
        issue_term: "pathname",
        label: "comment",
        theme: "github-light",
        crossorigin: "anonymous",
        async: true,
      },
    },
  },
};

export default siteQuery;

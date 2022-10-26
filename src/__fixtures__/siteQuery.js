const siteQuery = {
  site: {
    siteMetadata: {
      title: "SOGOAGAIN",
      interests: ["Software"],
      social: {
        email: "imyong0@gmail.com",
        github: "sogoagain",
        twitter: "sogoagain",
      },
      link: {
        postsBasePath: "/posts",
        rss: "/rss.xml",
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

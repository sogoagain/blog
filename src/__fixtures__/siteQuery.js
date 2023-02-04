const siteQuery = {
  site: {
    siteMetadata: {
      title: "SOGOAGAIN",
      description: "SOGOAGAIN 블로그",
      titleTemplate: "%s · SOGOAGAIN",
      interests: ["Software"],
      social: {
        email: "imyong0@gmail.com",
        github: "sogoagain",
        twitter: "sogoagain",
        nostr: {
          name: "sogoagain",
          nPubKey:
            "npub1nhffp7hfyy2weckcw7tslaf20qhk7dp59zal2swghx4tpc9ejjxsuqxcf8",
        },
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
      bitcoinAddress: "3FX1cWgBBnHSzrGrdfvRZxibZip4sbgdMD",
    },
  },
};

export default siteQuery;

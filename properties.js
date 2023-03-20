module.exports = {
  site: {
    title: "SOGOAGAIN",
    titleTemplate: "%s · SOGOAGAIN",
    description: "SOGOAGAIN 블로그",
    siteUrl: `https://blog.sogoagain.com`,
    image: "/logo.png",
    author: "sogoagain",
  },
  interests: [
    "Software",
    "Developer",
    "Engineering",
    "TDD",
    "Agile",
    "eXtreme Programming",
    "Bitcoin",
    "Decentralization",
    "Web",
  ],
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
  deploy: {
    s3Bucket: "sogoagain-blog",
  },
  utterances: {
    src: "https://utteranc.es/client.js",
    repo: "sogoagain/blog-comments",
    "issue-term": "pathname",
    label: "comment",
    theme: "github-light",
    crossorigin: "anonymous",
    async: true,
  },
  gtag: {
    trackingIds: ["G-8E6LZKQXFC"],
  },
};

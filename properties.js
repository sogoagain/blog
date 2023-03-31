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
    "Web",
    "Agile",
    "Software",
    "Developer",
    "Engineering",
    "eXtreme Programming",
    "Test Driven Development",
    "Bitcoin",
    "Decentralization",
    "Lightning Network",
  ],
  social: {
    email: "sogoagain@proton.me",
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
    theme: "preferred-color-scheme",
    crossorigin: "anonymous",
    async: true,
  },
  gtag: {
    trackingIds: ["G-8E6LZKQXFC"],
  },
};

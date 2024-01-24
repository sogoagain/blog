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
    email: "sogoagain@sogoagain.com",
    github: "sogoagain",
    nostr: {
      name: "sogoagain",
      nPubKey:
        "npub1nhffp7hfyy2weckcw7tslaf20qhk7dp59zal2swghx4tpc9ejjxsuqxcf8",
      relays: [
        "wss://nostr.oxtr.dev",
        "wss://relay.nostr.band",
        "wss://offchain.pub",
        "wss://relay.damus.io",
        "wss://nostr.bitcoiner.social",
        "wss://relay.mostr.pub",
        "wss://nos.lol",
      ],
    },
  },
  link: {
    postsBasePath: "/posts",
    rss: "/rss.xml",
  },
  deploy: {
    s3Bucket: "sogoagain-blog",
  },
  giscus: {
    repo: "sogoagain/blog",
    repoId: "R_kgDOGyvI0A",
    category: "Comments",
    categoryId: "DIC_kwDOGyvI0M4CcoSF",
    mapping: "pathname",
    theme: "preferred_color_scheme",
  },
  gtag: {
    trackingIds: ["G-8E6LZKQXFC"],
  },
};

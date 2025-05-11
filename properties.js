module.exports = {
  site: {
    title: "SOGOAGAIN",
    titleTemplate: "%s · SOGOAGAIN",
    description: "SOGOAGAIN 블로그",
    siteUrl: `https://blog.sogoagain.com`,
    image: "/images/logo-light.png",
    author: "sogoagain",
  },
  interests: [
    "Software",
    "Engineering",
    "Agile",
    "eXtreme Programming",
    "Test Driven Development",
    "Bitcoin",
    "Lightning Network",
    "Nostr",
  ],
  social: {
    email: "hello@sogoagain.com",
    github: "sogoagain",
    nostr: {
      name: "sogoagain",
      npub: "npub1nhffp7hfyy2weckcw7tslaf20qhk7dp59zal2swghx4tpc9ejjxsuqxcf8",
      primal: "https://primal.net/sogoagain",
      relays: [
        "wss://premium.primal.net",
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

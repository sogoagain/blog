const siteQuery = {
  site: {
    siteMetadata: {
      title: "SOGOAGAIN",
      description: "SOGOAGAIN 블로그",
      titleTemplate: "%s · SOGOAGAIN",
      interests: ["Software"],
      social: {
        email: "sogoagain@sogoagain.com",
        github: "sogoagain",
        nostr: {
          name: "sogoagain",
          npub: "npub16686greycr3g4dpa8lndgqrrfxs0qdky8xtxp3nnc8z8upegzpkq566g38",
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
      giscus: {
        repo: "sogoagain/blog",
        repoId: "R_kgDOGyvI0A",
        category: "Comments",
        categoryId: "DIC_kwDOGyvI0M4CcoSF",
        mapping: "pathname",
        theme: "preferred_color_scheme",
      },
    },
  },
};

export default siteQuery;

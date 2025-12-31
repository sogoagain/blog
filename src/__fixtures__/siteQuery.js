const siteQuery = {
  site: {
    siteMetadata: {
      title: "SOGOAGAIN",
      description: "SOGOAGAIN 블로그",
      titleTemplate: "%s · SOGOAGAIN",
      interests: ["Software"],
      social: {
        email: "hello@sogoagain.com",
        github: "sogoagain",
        nostr: {
          name: "sogoagain",
          npub: "npub16686greycr3g4dpa8lndgqrrfxs0qdky8xtxp3nnc8z8upegzpkq566g38",
          primal: "https://primal.net/sogoagain",
          bootstrapRelays: [
            "wss://relay.damus.io",
            "wss://premium.primal.net",
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

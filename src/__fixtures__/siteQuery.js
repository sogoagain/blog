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

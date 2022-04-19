module.exports = {
  site: {
    title: "SOGOAGAIN",
    titleTemplate: "%s · SOGOAGAIN",
    description: "SOGOAGAIN 블로그",
    siteUrl: `https://blog.sogoagain.com`,
    image: "/profile.png",
    author: "sogoagain",
  },
  social: {
    email: "imyong0@gmail.com",
    github: "sogoagain",
    twitter: "sogoagain",
    linkedin: "sogoagain",
  },
  link: {
    postsBasePath: "/posts",
    rss: "/rss.xml",
    about:
      "https://sogoagain.notion.site/About-599f1c0b47314c30800c706265b0a7bd",
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
};

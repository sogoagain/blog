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
    "Test Driven Development",
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
  bitcoinAddress: "3FX1cWgBBnHSzrGrdfvRZxibZip4sbgdMD",
};

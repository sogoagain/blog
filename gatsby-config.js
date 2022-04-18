const properties = require("./properties");

module.exports = {
  siteMetadata: {
    title: properties.site.title,
    siteUrl: properties.site.url,
    author: properties.site.author,
    social: {
      ...properties.social,
    },
    rss: properties.rss,
    utterances: properties.utterances,
    about: properties.about,
  },
  plugins: [
    "gatsby-plugin-emotion",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/logo.png",
      },
    },
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `ignore`,
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`,
      },
      __key: "posts",
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: properties.site.s3Bucket,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.edges.map((edge) => {
                const postUrl = `${site.siteMetadata.siteUrl}${properties.postsBasePath}${edge.node.fields.slug}`;
                return {
                  ...edge.node.frontmatter,
                  description: edge.node.frontmatter.subtitle,
                  url: postUrl,
                  guid: postUrl,
                };
              }),
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      fields { slug }
                      frontmatter {
                        date
                        title
                        subtitle
                      }
                    }
                  }
                }
              }
            `,
            output: properties.rss,
            title: `${properties.site.title} RSS Feed`,
          },
        ],
      },
    },
  ],
};

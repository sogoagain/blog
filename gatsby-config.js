const properties = require("./properties");

module.exports = {
  siteMetadata: {
    ...properties.site,
    interests: [...properties.interests],
    social: {
      ...properties.social,
    },
    link: {
      ...properties.link,
    },
    giscus: {
      ...properties.giscus,
    },
  },
  plugins: [
    "gatsby-plugin-emotion",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /hashtags/,
        },
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "static/logo.png",
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
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "noopener noreferrer",
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
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
        name: `content`,
        path: `${__dirname}/content`,
      },
      __key: "content",
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: properties.deploy.s3Bucket,
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
                const postUrl = `${site.siteMetadata.siteUrl}${properties.link.postsBasePath}${edge.node.fields.slug}`;
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
                  sort: {frontmatter: {date: DESC}}
                  filter: {fileAbsolutePath: {regex: "/(posts)/"}}
                ) {
                  edges {
                    node {
                      fields {
                        slug
                      }
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
            output: properties.link.rss,
            title: `${properties.site.title} RSS Feed`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [...properties.gtag.trackingIds],
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
        pluginConfig: {
          head: false,
          respectDNT: true,
        },
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
  ],
};

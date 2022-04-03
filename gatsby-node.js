const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const { path, date } = node.frontmatter;
    const year = new Date(date).getFullYear();

    const slug = path ? `/${year}/${path}/` : createFilePath({ node, getNode });

    createNodeField({ name: "slug", value: slug, node });
  }
};

const tagsQeury = {
  allMarkdownRemark: {
    nodes: [
      { frontmatter: { tags: "tag1, tag2" } },
      { frontmatter: { tags: "tag3" } },
      { frontmatter: { tags: "tag4, tag2" } },
    ],
  },
};

export default tagsQeury;

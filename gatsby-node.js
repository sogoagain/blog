const fs = require("fs-extra");
const path = require("path");

const { createFilePath } = require("gatsby-source-filesystem");
const { nip19 } = require("nostr-tools");

const properties = require("./properties");

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const { path: pathname, date } = node.frontmatter;
    const year = new Date(date).getFullYear();

    const slug = pathname
      ? `/${year}/${pathname}/`
      : createFilePath({ node, getNode });

    createNodeField({ name: "slug", value: slug, node });
  }
};

exports.onPostBuild = async () => {
  const publicPath = `./public`;
  const nip05Path = `.well-known/nostr.json`;
  const outputPath = path.join(publicPath, nip05Path);
  const outputDir = path.dirname(outputPath);
  if (!(await fs.pathExists(outputDir))) {
    await fs.mkdirp(outputDir);
  }
  const { name, npub, relays } = properties.social.nostr;
  const { data: pubkey } = nip19.decode(npub);
  await fs.writeFile(
    outputPath,
    JSON.stringify({
      names: {
        _: pubkey,
        [name]: pubkey,
      },
      relays: { [pubkey]: [...relays] },
    }),
  );
};

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  const config = getConfig();
  if (config.externals && config.externals[0]) {
    config.externals[0]["node:crypto"] = require.resolve("crypto-browserify");
  }
  actions.replaceWebpackConfig(config);
};

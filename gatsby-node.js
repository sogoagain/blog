const fs = require("fs-extra");
const path = require("path");

const { createFilePath } = require("gatsby-source-filesystem");
const exifr = require("exifr");
const { nip19 } = require("nostr-tools");

const properties = require("./properties");

exports.onCreateNode = async ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "MarkdownRemark") {
    const { path: pathname, date } = node.frontmatter;
    const year = new Date(date).getFullYear();
    const slug = pathname
      ? `/${year}/${pathname}/`
      : createFilePath({ node, getNode });
    createNodeField({ name: "slug", value: slug, node });
  } else if (
    node.internal.mediaType === "image/jpeg" ||
    node.internal.mediaType === "image/png"
  ) {
    if (node.relativeDirectory === "photos") {
      const metadata = await exifr.parse(node.absolutePath, {
        tiff: true,
        exif: true,
      });
      const formatDate = (date) => {
        const d = new Date(date);
        return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
      };
      createNodeField({
        name: "cameraModel",
        value: metadata.Model || "Unknown",
        node,
      });
      createNodeField({
        name: "lensModel",
        value: metadata.LensModel || "Unknown",
        node,
      });
      createNodeField({
        name: "iso",
        value: metadata.ISO || "Unknown",
        node,
      });
      createNodeField({
        name: "focalLength",
        value: metadata.FocalLength || "Unknown",
        node,
      });
      createNodeField({
        name: "aperture",
        value: metadata.FNumber || "Unknown",
        node,
      });
      createNodeField({
        name: "shutterSpeed",
        value: metadata.ExposureTime
          ? `1/${Math.round(1 / metadata.ExposureTime)}s`
          : "Unknown",
        node,
      });
      createNodeField({
        name: "dateTimeOriginal",
        value: metadata.DateTimeOriginal
          ? formatDate(metadata.DateTimeOriginal)
          : "Unknown",
        node,
      });
    }
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

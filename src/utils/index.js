export function yyyyMMddToISOString(date) {
  return new Date(date).toISOString();
}

export function shuffleArray(origin) {
  const array = [...origin];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function getUniqueTags(nodes) {
  return [
    ...new Set(
      nodes.flatMap((node) =>
        node.frontmatter.tags
          ? node.frontmatter.tags.split(",").map((tag) => tag.trim())
          : []
      )
    ),
  ].sort((a, b) => a.localeCompare(b));
}

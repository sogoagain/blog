export function convertUnixTimestampToDate(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  return date.toISOString().split("T")[0];
}

export function toISOString(date) {
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

export function isImageUrl(url) {
  return /\.(jpeg|jpg|gif|png|webp)$/.test(url);
}

export async function fetchReadingList({ pageSize, startCursor }) {
  const queryString = new URLSearchParams({ pageSize, startCursor }).toString();
  const url = `https://api.sogoagain.com/v1/blog/reading-list?${queryString}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("독서목록을 불러오지 못했습니다.");
  }

  const data = await response.json();
  return data;
}

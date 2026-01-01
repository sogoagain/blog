export async function fetchBooks() {
  const url = `https://api.sogoagain.com/v1/blog/books`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  const response = await fetch(url, { signal: controller.signal });
  clearTimeout(timeoutId);

  if (!response.ok) {
    throw new Error("독서목록을 불러오지 못했습니다.");
  }

  return response.json();
}

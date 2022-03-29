export async function fetchGithubUser(username) {
  const url = `https://api.github.com/users/${username}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Github User 데이터를 가져오지 못했습니다.");
  }

  const data = await response.json();
  return data;
}

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

export async function createLightningInvoice() {
  const url = `https://api.sogoagain.com/v1/blog/lightning/invoices`;
  const response = await fetch(url, { method: "POST" });

  if (!response.ok) {
    throw new Error("인보이스를 발행하지 못했습니다.");
  }

  const data = await response.json();
  return data;
}

export async function lookupLightningInvoice({ r_hash }) {
  const queryString = new URLSearchParams({ r_hash }).toString();
  const url = `https://api.sogoagain.com/v1/blog/lightning/invoices/is-settled?${queryString}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("인보이스 상태를 조회할 수 없습니다.");
  }

  const data = await response.json();
  return data;
}

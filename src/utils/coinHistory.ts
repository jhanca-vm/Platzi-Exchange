export function getCoinHistory(coin: string): Promise<any> {
  const now: Date = new Date();
  const end: number = now.getTime();
  now.setHours(now.getHours() - 6);
  const start: number = now.getTime();

  return fetch(
    `https://api.coincap.io/v2/assets/${coin}/history?interval=h1&start=${start}&end=${end}`
  )
    .then(res => res.json())
    .then(res => res.data);
}

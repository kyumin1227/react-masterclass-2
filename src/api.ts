const BASE_URL = `https://api.coinpaprika.com/v1`;
const NOMAD_URL = `https://ohlcv-api.nomadcoders.workers.dev`;


export function fetchCoins() {
    return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinInfo(coinId?: string) {
    return fetch(`${BASE_URL}/coins/${coinId}`).then((response) => response.json());
}

export function fetchCoinTickers(coinId?: string) {
    return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) => response.json());
}

export function fetchCoinHistory(coinId: string) {
     // url 변경으로 인해 필요없음 -----------------
    const endDate = Math.floor(Date.now() / 1000)
    const startDate = endDate - 60 * 60 * 24 * 7;
    //--------------------------------------------
    return fetch(`${NOMAD_URL}?coinId=${coinId}`).then((response) => response.json());
}
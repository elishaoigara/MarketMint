import axios from 'axios';

export const getTopCryptos = async () => {
  try {
    const res = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets',
      {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 20,
          page: 1,
          sparkline: false,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

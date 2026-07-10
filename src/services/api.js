import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  timeout: 10000,
});

export const getTopCryptos = async (perPage = 20) => {
  try {
    const res = await api.get('/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: perPage,
        page: 1,
        sparkline: false,
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getSimplePrice = async (ids) => {
  try {
    const res = await api.get('/simple/price', {
      params: {
        ids: ids.join(','),
        vs_currencies: 'usd',
        include_24hr_change: 'true',
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching simple price:', error);
    throw error;
  }
};

export default api;

import axios, { AxiosRequestConfig } from 'axios';
import { CURRENCY_EXCHANGE_API_KEY, CURRENCY_EXCHANGE_QUERY_KEY } from '../../../env';
import { useQuery } from 'react-query';

type requestParams = { from: string | undefined; to: string | undefined };

export const useConvertCurrency = (params: requestParams) => {
  const config: AxiosRequestConfig = {
    headers: {
      'X-RapidAPI-Key': CURRENCY_EXCHANGE_API_KEY,
      'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com',
    },
    params,
  };

  return useQuery(
    CURRENCY_EXCHANGE_QUERY_KEY,
    async () =>
      await (
        await axios.get('https://currency-exchange.p.rapidapi.com/exchange', config)
      ).data,
    { refetchOnWindowFocus: false, enabled: false }
  );
};

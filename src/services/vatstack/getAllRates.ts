import axios, { AxiosRequestConfig } from 'axios';
import { VATSTACK_PUBLIC_API_KEY, VAT_RATES_QUERY_KEY } from '../../../env';
import { useQuery } from 'react-query';

export interface VatRate {
  abbreviation: string;
  categories: {
    audiobook: number;
    broadcasting: number;
    ebook: number;
    eperiodical: number;
    eservice: number;
    telecommunication: number;
  };
  country_code: string;
  country_name: string;
  currency: string;
  local_name: string;
  member_state: boolean;
  reduced_rates: number[];
  standard_rate: number;
  vat_abbreviation: string;
  vat_local_name: string;
}

interface AllRatesResponse {
  has_more: boolean;
  rates_count: number;
  rates: VatRate[];
}

export const useAllRatesQuery = () => {
  const config: AxiosRequestConfig = {
    headers: {
      'X-API-KEY': VATSTACK_PUBLIC_API_KEY,
    },
  };
  return useQuery<AllRatesResponse>(
    VAT_RATES_QUERY_KEY,
    async () => await (await axios.get('https://api.vatstack.com/v1/rates', config)).data,
    { refetchOnWindowFocus: false }
  );
};

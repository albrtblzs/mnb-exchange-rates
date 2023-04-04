// import axios from "axios";

// const response = await axios.get("https://www.mnb.hu/Jegybanki_alapkamat_alakulasa");
// const html = response.data;
// console.log(html);

import axios from 'axios';
import * as convert from 'xml-js';
import { ExchangeRateERP } from '../interface/exchange-rate';

interface ExchangeRateAPI {
  _declaration: { _attributes: { version: string, encoding: string } },
  arfolyamok: { valuta: {}, deviza: { item: ExchangeRateItem[] } },
}

interface ExchangeRateItem {
  bank: { _text: string },
  datum: { _text: string },
  penznem: { _text: string },
  kozep: [{ _text: string }, { _text: string }]
}

/**
 * Get exchange rates from napiarfolyam api
 * @returns ExchangeRate[]
 */
export const getExchangeRatesAPI = async (): Promise<ExchangeRateERP[]> => {

  const bank = 'mnb';
  const echangeRateUrl = `https://cors-anywhere.herokuapp.com/http://api.napiarfolyam.hu?bank=${bank}`;
  try {
    const exchangeRateResponse = await axios.get(echangeRateUrl, { headers: {} 
   });
    const exchangeRates: ExchangeRateAPI = JSON.parse(convert.xml2json(exchangeRateResponse.data, { compact: true, spaces: 4 }));
    console.log(exchangeRates);
    if(!exchangeRates.arfolyamok.deviza.item) return [];
    const exchangeRateItems: ExchangeRateERP[] | undefined = exchangeRates.arfolyamok.deviza.item
      .map((item) => {
        return {
          bank: item.bank._text,
          date: new Date(item.datum._text),
          currency: item.penznem._text,
          exchangeRate: Number(item.kozep[0]._text) || Number(item.kozep[1]._text),
        }
      });
    // if (!exchangeRateItems) {
    //   throw new Error('No exchange rates');
    // }
    return exchangeRateItems;
  } catch (error: any) {
    throw new Error(error);
  }
};

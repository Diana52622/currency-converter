import axios from 'axios';


export const fetchCurrencies = async () => {
  try {
    const response = await axios.get(apiUrl);
    const rates = response.data.conversion_rates;

    localStorage.setItem('exchangeRates', JSON.stringify(rates));
    localStorage.setItem('exchangeRatesTime', new Date().getTime());

    return rates;
  } catch (error) {
    throw new Error('Ошибка при загрузке курсов валют.');
  }
};
import axios from 'axios';


export const fetchCurrencies = async () => {
  const cachedRates = localStorage.getItem('exchangeRates');
  const cacheTime = localStorage.getItem('exchangeRatesTime');

  const currentTime = new Date().getTime();

  if (cachedRates && cacheTime && (currentTime - cacheTime < 3600000)) {
    return JSON.parse(cachedRates);
  }

  try {
    const response = await axios.get(apiUrl);
    const rates = response.data.conversion_rates;

    localStorage.setItem('exchangeRates', JSON.stringify(rates));
    localStorage.setItem('exchangeRatesTime', currentTime);

    return rates;
  } catch (error) {
    throw new Error('Ошибка при загрузке курсов валют.');
  }
};
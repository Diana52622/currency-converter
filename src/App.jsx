import React, { useState, useEffect } from 'react';
import { fetchCurrencies } from './services/api'; 
import InputForm from './components/InputForm';
import ConvertButton from './components/ConvertButton';
import ConversionResult from './components/ConversionResult';
import PageExchangeRates from './components/PageExchangeRates';

const App = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [currencies, setCurrencies] = useState([]);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState('');
  const [rates, setRates] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rates = await fetchCurrencies();
        setRates(rates);
        setCurrencies(['USD', ...Object.keys(rates)]);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const convertCurrency = () => {
    if (amount && !isNaN(amount)) {
      const rate = rates[toCurrency] / rates[fromCurrency];
      setConvertedAmount((amount * rate).toFixed(2));
      setError('');
    } else {
      setError('Введите корректную сумму.');
      setConvertedAmount(null);
    }
  };

  return (
    <div className="app-container">
      <h1>Конвертер валют</h1>
      <InputForm 
        amount={amount} 
        setAmount={setAmount} 
        fromCurrency={fromCurrency} 
        setFromCurrency={setFromCurrency} 
        toCurrency={toCurrency} 
        setToCurrency={setToCurrency} 
        currencies={currencies} 
      />
      <ConvertButton onClick={convertCurrency} />
      <ConversionResult 
        convertedAmount={convertedAmount} 
        toCurrency={toCurrency} 
        error={error} 
      />
      <PageExchangeRates/>
    </div>
  );
};

export default App;
import React, { useEffect, useState } from 'react';
import { fetchCurrencies } from '../services/api';
import RatesTable from './RatesTable'; 
import './main.css';

const PageExchangeRates = () => {
  const [rates, setRates] = useState({});
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ratesData = await fetchCurrencies();
        setRates(ratesData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const toggleFavorite = (currency) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.includes(currency)
        ? prevFavorites.filter((fav) => fav !== currency)
        : [...prevFavorites, currency];

      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <div className="container">
      <h1>Курсы валют</h1>
      {error && <p className="error">{error}</p>}
      <RatesTable 
        rates={rates} 
        favorites={favorites} 
        toggleFavorite={toggleFavorite} 
        showAll={showAll} 
      />
      <button className="button" onClick={toggleShowAll}>
        {showAll ? 'Скрыть' : 'Показать все'}
      </button>
    </div>
  );
};

export default PageExchangeRates;
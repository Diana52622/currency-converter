import React from 'react';
import './main.css'; 

const RatesTable = ({ rates, favorites, toggleFavorite, showAll }) => {
  const sortedRates = Object.entries(rates).sort(([currencyA], [currencyB]) => {
    const isAFavorite = favorites.includes(currencyA);
    const isBFavorite = favorites.includes(currencyB);
    return isAFavorite === isBFavorite ? 0 : isAFavorite ? -1 : 1;
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Валюта</th>
          <th>Курс</th>
          <th>Избранное</th>
        </tr>
      </thead>
      <tbody>
        {sortedRates.slice(0, showAll ? sortedRates.length : 10).map(([currency, rate]) => (
          <tr key={currency}>
            <td>{currency}</td>
            <td>{rate}</td>
            <td>
              <button
                className={`button ${favorites.includes(currency) ? 'favorite' : 'add'}`}
                onClick={() => toggleFavorite(currency)}
              >
                {favorites.includes(currency) ? 'Убрать из избранного' : 'Добавить в избранное'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RatesTable;
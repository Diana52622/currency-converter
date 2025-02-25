import React from 'react';
import './main.css';

const ConversionResult = ({ convertedAmount, toCurrency, error }) => {
  return (
    <div className="result-container">
      {error && <p className="error-message">{error}</p>}
      {convertedAmount !== null && (
        <p className="result-text">
          Результат конвертации: {convertedAmount} {toCurrency}
        </p>
      )}
    </div>
  );
};

export default ConversionResult;
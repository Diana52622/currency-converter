import React from 'react';
import './main.css';

const ConvertButton = ({ onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      Конвертировать
    </button>
  );
};

export default ConvertButton;
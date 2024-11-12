// src/components/DataDisplay.jsx
import React from 'react';

const DataDisplay = ({ data, fallbackMessage, children }) => {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">{fallbackMessage}</p>;
  }

  return <div>{children}</div>;
};

export default DataDisplay;

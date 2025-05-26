import React, { useState, useEffect } from 'react';

const SearchBox = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(inputValue.trim());
    }, 500); // debounce 500ms

    return () => clearTimeout(timeout);
  }, [inputValue, onSearch]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-xl shadow-sm"
        placeholder="Buscar productos..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;

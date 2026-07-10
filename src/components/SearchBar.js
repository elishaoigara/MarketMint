import React, { useState, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';

function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('');
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      if (onSearch) onSearch(inputValue);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [inputValue, onSearch]);

  return (
    <Form onSubmit={(e) => e.preventDefault()} className="mb-3">
      <Form.Control
        type="text"
        placeholder="Search for a coin..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        aria-label="Search coins"
      />
    </Form>
  );
}

export default SearchBar;

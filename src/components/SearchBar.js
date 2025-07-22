import React from 'react';
import { Form } from 'react-bootstrap';

function SearchBar({ setSearch }) {
  return (
    <Form className="mb-3">
      <Form.Control
        type="text"
        placeholder="Search for a coin..."
        onChange={(e) => setSearch(e.target.value)}
      />
    </Form>
  );
}

export default SearchBar;

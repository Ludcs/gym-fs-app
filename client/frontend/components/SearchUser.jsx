'use client';
import { useState, useEffect, useRef } from 'react';
import { FaSistrix } from 'react-icons/fa6';

export default function SearchUser({ searchOneUser }) {
  const [searchValue, setSearchValue] = useState('');

  const debounceRef = useRef();

  const handleValueSearch = (event) => {
    const { value } = event.target;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      searchOneUser(value);
    }, 400);
    setSearchValue(value);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  // };

  return (
    <form>
      <div className="flex relative items-center">
        <FaSistrix size={20} className="absolute left-2 text-primary" />
        <input
          className="border border-primary rounded-md py-2 px-8 w-full outline-none"
          type="text"
          placeholder="Buscar usuario"
          value={searchValue}
          onChange={handleValueSearch}
        />
      </div>
    </form>
  );
}

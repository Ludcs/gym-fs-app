'use client';

import { useState } from 'react';

export default function Select({ filterByActivity }) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    const { value } = event.target;
    setSelectedOption(value);
    filterByActivity(value);
  };

  return (
    <form className="mx-auto w-1/3">
      <select
        value={selectedOption}
        onChange={handleSelectChange}
        className="bg-primary border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="" disabled hidden>
          Filtrar por estado
        </option>
        <option value="all">Todos</option>
        <option value="active">Activos</option>
        <option value="inactive">Inactivos</option>
      </select>
    </form>
  );
}

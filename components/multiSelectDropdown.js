import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

const MultiSelectDropdown = ({ name, options, defaultValue }) => {
  const { control, setValue } = useForm();
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    setSelectedOptions(defaultValue || []);
    setValue(name, defaultValue || []);
  }, [defaultValue, name, setValue]);

  const handleOptionClick = (option) => {
    const selectedIndex = selectedOptions.indexOf(option);
    let updatedOptions = [...selectedOptions];

    if (selectedIndex > -1) {
      updatedOptions.splice(selectedIndex, 1);
    } else {
      updatedOptions.push(option);
    }

    setSelectedOptions(updatedOptions);
    setValue(name, updatedOptions);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <div className="relative">
          <button
            type="button"
            className="inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onBlur={onBlur}
          >
            {selectedOptions.length > 0 ? (
              <span className="mr-2">{selectedOptions.length} selected</span>
            ) : (
              <span className="mr-2">Select options</span>
            )}
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          {selectedOptions.length > 0 && (
            <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
              <ul className="py-1">
                {options.map((option) => (
                  <li
                    key={option.value}
                    onClick={() => handleOptionClick(option)}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox mr-2"
                      checked={selectedOptions.includes(option)}
                      onChange={() => {}}
                    />
                    {option.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <input type="hidden" value={value} onChange={onChange} />
        </div>
      )}
    />
  );
};

export default MultiSelectDropdown;

import React from "react";

const Select = ({
  options = [],
  value,
  onChange,
  disabled = false,
  required = false,
  className = "",
  placeholder = "Select an option",
  id,
  name,
  ...props
}) => {
  return (
    <div className="w-full">
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        id={id}
        name={name}
        className={`
          w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
          focus:outline-none focus:ring-2 focus:ring-blue-500 
          focus:border-blue-500 transition duration-200 ease-in-out
          ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white hover:border-gray-400'}
          ${className}
        `}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option 
            key={option.value || index} 
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
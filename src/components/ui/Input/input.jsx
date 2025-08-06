import React from "react";

const Input = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  disabled = false,
  required = false,
  className = "",
  id,
  name,
  autoComplete,
  maxLength,
  minLength,
  pattern,
  ...props
}) => {
  return (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        id={id}
        name={name}
        autoComplete={autoComplete}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
        className={`
          w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
          placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
          focus:border-blue-500 transition duration-200 ease-in-out
          ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white hover:border-gray-400'}
          ${className}
        `}
        {...props}
      />
    </div>
  );
};

export default Input;
import React from 'react';

const Input = ({
  type,
  name,
  placeholder,
  error,
  register,
  errorText,
  value = '',
  disabled = false,
  size,
  className,
  formValidation,
}) => {
  let classNames = ` px-4 ${
    size === 'large' ? 'py-4' : 'py-2'
  } text-sm border rounded-md focus:border-primary-400 w-full focus:outline-none focus:ring-1 focus:ring-primary-600 ${className}`;
  return (
    <div className='mt-4'>
      <label className='block text-sm mb-2'>{name}</label>
      {register ? (
        <input
          type={type}
          className={classNames}
          placeholder={placeholder}
          onChange={(e) => {
            console.log(e.target.value);
          }}
          {...formValidation}
          disabled={disabled}
          defaultValue={value}
        />
      ) : (
        <input
          type={type}
          className={classNames}
          placeholder={placeholder}
          onChange={(e) => {
            console.log(e.target.value);
          }}
          disabled={disabled}
          value={value}
        />
      )}
      {error ? <p className='text-xs text-red-700 mt-1'>{errorText}</p> : null}
    </div>
  );
};

export default Input;

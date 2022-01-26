import React from 'react';

const Input = ({
  type,
  name,
  placeholder,
  error,
  formInputName,
  register,
  errorText,
}) => {
  return (
    <div className='mt-4'>
      <label className='block text-sm mb-2'>{name}</label>
      <input
        type={type}
        className='w-full px-4 py-2 text-sm border rounded-md focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-600'
        placeholder={placeholder}
        onChange={(e) => {
          console.log(e.target.value);
        }}
        {...register(formInputName)}
      />
      {error ? <p className='text-xs text-red-700 mt-1'>{errorText}</p> : null}
    </div>
  );
};

export default Input;

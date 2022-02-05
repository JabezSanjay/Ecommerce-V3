import React from 'react';
import { PushSpinner } from 'react-spinners-kit';

const Button = ({ name, onClick, loading, className, size }) => {
  return (
    <button
      onClick={onClick}
      type='submit'
      className={`${
        size !== 'small'
          ? `block w-full px-4 py-2 mt-6 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-primary-600 border border-transparent rounded-lg active:bg-primary-600 hover:bg-primary-700 focus:outline-none focus:shadow-outline-primary ${className}`
          : 'inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-primary-600 hover:bg-primary-600 hover:text-white focus:shadow-outline focus:outline-none'
      }`}
    >
      <span className='flex justify-center'>
        {' '}
        <PushSpinner size={30} color='#fff' loading={loading} />
        {!loading && name}
      </span>
    </button>
  );
};

export default Button;
// className='inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-primary-600 hover:bg-primary-600 hover:text-white focus:shadow-outline focus:outline-none'

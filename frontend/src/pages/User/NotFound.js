import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className='min-h-screen'>
      <div className='min-h-screen flex items-center flex-col justify-center lg:flex-row  px-6 md:px-24 md:py-20 lg:py-32 lg:gap-28'>
        <div className='w-full lg:w-1/2'>
          <img
            className='block'
            src='https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif'
            alt='404'
          />
        </div>
        <div className='w-full lg:w-1/2'>
          <h1 className='py-4 text-3xl lg:text-4xl font-extrabold text-gray-800'>
            Looks like you've found the doorway to the great nothing
          </h1>
          <p className='py-4 text-base text-gray-800'>
            The content you’re looking for doesn’t exist. Either it was removed,
            or you mistyped the link.
          </p>
          <p className='py-2 text-base text-gray-800'>
            Sorry about that! Please visit our hompage to get where you need to
            go.
          </p>
          <button
            onClick={() => navigate('/')}
            className='w-full lg:w-auto my-4 border rounded-md px-1 sm:px-16 py-5 bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-700'
          >
            Go back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

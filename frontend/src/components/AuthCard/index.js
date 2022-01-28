import React from 'react';

const AuthCard = ({ children }) => {
  return (
    <div className='flex items-center min-h-[92vh] bg-gray-50 p-5'>
      <div className='flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl'>
        <div className='flex flex-col md:flex-row'>{children}</div>
      </div>
    </div>
  );
};

export default AuthCard;

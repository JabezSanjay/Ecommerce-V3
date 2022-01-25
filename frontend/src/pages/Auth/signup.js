import React from 'react';
import GoogleIcon from '../../assets/images/icons/google-icon.png';

const Signup = () => {
  return (
    <div className='relative min-h-screen bg-primary-900 text-white font-medium flex justify-center'>
      <div className='max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <div className='mt-12 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-extrabold'>
              Sign up to buy!
            </h1>
            <div className='w-full flex-1 mt-8'>
              <div className='flex flex-col items-center'>
                <button className='w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0'>
                  <span className='bg-white p-2 rounded-full'>
                    <img src={GoogleIcon} className='w-4' alt='' />
                  </span>
                  <span className='ml-4'>Sign in with Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

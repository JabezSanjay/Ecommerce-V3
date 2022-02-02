import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ page, userType, children }) => {
  const [isNavbarOpened, setIsNavbarOpened] = useState(false);
  return (
    <>
      <div className='flex flex-no-wrap mt-1'>
        {/* <!-- Sidebar starts -->
      <!-- Remove className [ hidden ] and replace [ sm:flex ] with [ flex ] --> */}
        <div
          style={{ minHeight: '90vh' }}
          className={`w-64 absolute sm:relative bg-white shadow md:h-full flex-col justify-between ${
            isNavbarOpened ? 'flex' : 'hidden'
          }`}
        >
          <div className=''>
            <ul className=''>
              <Link
                to={`${
                  userType === 'admin' ? '/admin/dashboard' : '/user/dashboard'
                }`}
                className={`p-3 ${
                  page === 'dashboard'
                    ? 'text-white bg-primary-600'
                    : 'text-primary-600 bg-white'
                }  flex w-full justify-between cursor-pointer items-center my-4`}
              >
                <li className='flex items-center focus:outline-none focus:ring-2 focus:ring-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='icon icon-tabler icon-tabler-grid'
                    width='18'
                    height='18'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z'></path>
                    <rect x='4' y='4' width='6' height='6' rx='1'></rect>
                    <rect x='14' y='4' width='6' height='6' rx='1'></rect>
                    <rect x='4' y='14' width='6' height='6' rx='1'></rect>
                    <rect x='14' y='14' width='6' height='6' rx='1'></rect>
                  </svg>
                  <span className='text-md ml-2'>Dashboard</span>
                </li>
              </Link>
              <Link
                to={`${userType === 'admin' ? '/admin/products' : '/'}`}
                className={`p-3 ${
                  page === 'products'
                    ? 'text-white bg-primary-600'
                    : 'text-primary-600 bg-white'
                }  flex w-full justify-between cursor-pointer items-center my-4`}
              >
                <li className='flex items-center focus:outline-none focus:ring-2 focus:ring-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='icon icon-tabler icon-tabler-compass'
                    width='18'
                    height='18'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z'></path>
                    <polyline points='8 16 10 10 16 8 14 14 8 16'></polyline>
                    <circle cx='12' cy='12' r='9'></circle>
                  </svg>
                  <span className='text-md ml-2'>
                    {userType === 'admin' ? 'Products' : 'Explore'}
                  </span>
                </li>
              </Link>
              <Link
                to={`${
                  userType === 'admin' ? '/admin/orders' : '/user/orders'
                }`}
                className={`p-3 ${
                  page === 'orders'
                    ? 'text-white bg-primary-600'
                    : 'text-primary-600 bg-white'
                }  flex w-full justify-between cursor-pointer items-center my-4`}
              >
                <li className='flex items-center focus:outline-none focus:ring-2 focus:ring-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='icon icon-tabler icon-tabler-puzzle'
                    width='18'
                    height='18'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z'></path>
                    <path d='M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1'></path>
                  </svg>
                  <span className='text-md ml-2'>Orders</span>
                </li>
              </Link>
              <Link
                to={`${
                  userType === 'admin' ? '/admin/users' : '/user/favourites'
                }`}
                className={`p-3 ${
                  page === 'users' || page === 'favourites'
                    ? 'text-white bg-primary-600'
                    : 'text-primary-600 bg-white'
                }  flex w-full justify-between cursor-pointer items-center my-4`}
              >
                <li className='flex items-center focus:outline-none focus:ring-2 focus:ring-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='icon icon-tabler icon-tabler-code'
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z'></path>
                    <polyline points='7 8 3 12 7 16'></polyline>
                    <polyline points='17 8 21 12 17 16'></polyline>
                    <line x1='14' y1='4' x2='10' y2='20'></line>
                  </svg>
                  <span className='text-md ml-2'>
                    {userType === 'admin' ? 'Users' : 'Favourites'}
                  </span>
                </li>
              </Link>
              <Link
                to='/profile'
                className={`p-3 ${
                  page === 'profile'
                    ? 'text-white bg-primary-600'
                    : 'text-primary-600 bg-white'
                }  flex w-full justify-between cursor-pointer items-center my-4`}
              >
                <li className='flex items-center focus:outline-none focus:ring-2 focus:ring-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='icon icon-tabler icon-tabler-settings'
                    width='18'
                    height='18'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' />
                    <path d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' />
                    <circle cx='12' cy='12' r='3' />
                  </svg>
                  <span className='text-md ml-2'>Profile</span>
                </li>
              </Link>
            </ul>
          </div>
        </div>
        <div
          className={`z-40 absolute ${isNavbarOpened ? 'w-64' : ''}`}
          id='mobile-nav'
        >
          <button
            aria-label='toggle sidebar'
            id='openSideBar'
            className='h-10 w-10 bg-primary-600 absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 rounded focus:ring-gray-800'
            onClick={() => setIsNavbarOpened(!isNavbarOpened)}
          >
            <img
              src='https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_icons_at_bottom-svg7.svg'
              alt='toggler'
            />
          </button>
        </div>
        {children}
      </div>
    </>
  );
};

export default Sidebar;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ page }) => {
  const [isNavbarOpened, setIsNavbarOpened] = useState(false);
  return (
    <>
      <div class='flex flex-no-wrap'>
        {/* <!-- Sidebar starts -->
      <!-- Remove class [ hidden ] and replace [ sm:flex ] with [ flex ] --> */}
        <div
          style={{ minHeight: '90vh' }}
          class={`w-64 absolute sm:relative bg-white shadow md:h-full flex-col justify-between ${
            isNavbarOpened ? 'flex' : 'hidden'
          }`}
        >
          <div class=''>
            <ul class=''>
              <li class='p-3 flex w-full justify-between text-primary-600 hover:bg-gray-100 cursor-pointer items-center my-4'>
                <a
                  href='/'
                  class='flex items-center focus:outline-none focus:ring-2 focus:ring-white'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    class='icon icon-tabler icon-tabler-grid'
                    width='18'
                    height='18'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    fill='none'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z'></path>
                    <rect x='4' y='4' width='6' height='6' rx='1'></rect>
                    <rect x='14' y='4' width='6' height='6' rx='1'></rect>
                    <rect x='4' y='14' width='6' height='6' rx='1'></rect>
                    <rect x='14' y='14' width='6' height='6' rx='1'></rect>
                  </svg>
                  <span class='text-md ml-2'>Dashboard</span>
                </a>
              </li>
              <li class='p-3 flex w-full justify-between text-primary-600 hover:bg-gray-100  cursor-pointer items-center my-4'>
                <Link
                  to='/'
                  class='flex items-center focus:outline-none focus:ring-2 focus:ring-white'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    class='icon icon-tabler icon-tabler-puzzle'
                    width='18'
                    height='18'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    fill='none'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z'></path>
                    <path d='M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1'></path>
                  </svg>
                  <span class='text-md ml-2'>Orders</span>
                </Link>
              </li>
              <li class='p-3 text-primary-600 hover:bg-gray-100 flex w-full justify-between  cursor-pointer items-center my-4'>
                <Link
                  to='/'
                  class='flex items-center focus:outline-none focus:ring-2 focus:ring-white'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    class='icon icon-tabler icon-tabler-compass'
                    width='18'
                    height='18'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    fill='none'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z'></path>
                    <polyline points='8 16 10 10 16 8 14 14 8 16'></polyline>
                    <circle cx='12' cy='12' r='9'></circle>
                  </svg>
                  <span class='text-md ml-2'>Explore</span>
                </Link>
              </li>
              <li class='p-3 flex w-full justify-betwee cursor-pointer items-center text-primary-600 hover:bg-gray-100 my-4 justify-between'>
                <Link
                  to='/'
                  class='flex items-center focus:outline-none focus:ring-2 focus:ring-white'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    class='icon icon-tabler icon-tabler-code'
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    fill='none'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z'></path>
                    <polyline points='7 8 3 12 7 16'></polyline>
                    <polyline points='17 8 21 12 17 16'></polyline>
                    <line x1='14' y1='4' x2='10' y2='20'></line>
                  </svg>
                  <span class='text-md ml-2'>Deliverables</span>
                </Link>
              </li>
              <li
                class={`p-3 ${
                  page === 'profile'
                    ? 'text-white bg-primary-600'
                    : 'text-primary-600 bg-white'
                }  flex w-full justify-between cursor-pointer items-center my-4`}
              >
                <Link
                  to='/'
                  class='flex items-center focus:outline-none focus:ring-2 focus:ring-white'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    class='icon icon-tabler icon-tabler-settings'
                    width='18'
                    height='18'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    fill='none'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' />
                    <path d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' />
                    <circle cx='12' cy='12' r='3' />
                  </svg>
                  <span class='text-md ml-2'>Settings</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div
          class={`z-40 absolute ${isNavbarOpened ? 'w-64' : ''}`}
          id='mobile-nav'
        >
          <button
            aria-label='toggle sidebar'
            id='openSideBar'
            class='h-10 w-10 bg-primary-600 absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 rounded focus:ring-gray-800'
            onClick={() => setIsNavbarOpened(!isNavbarOpened)}
          >
            <img
              src='https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_icons_at_bottom-svg7.svg'
              alt='toggler'
            />
          </button>
        </div>
        {/* <!-- Sidebar ends -->
      <!-- Remove class [ h-64 ] when adding a card block --> */}
        <div class='container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6'>
          {/* <!-- Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border --> */}
          <div class='w-full h-full rounded border-dashed border-2 border-gray-300'>
            {/* <!-- Place your content here --> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

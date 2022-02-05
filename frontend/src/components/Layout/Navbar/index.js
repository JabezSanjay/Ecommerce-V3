import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CartIcon from '../../../assets/images/icons/cart-icon.png';
import { logoutUser } from '../../../pages/Auth/helpers';
import Button from '../../Button';
import Toast from '../../Toast';

const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const logout = async () => {
    await logoutUser(dispatch).then((response) => {
      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success('User logout successful!');
      }
    });
  };
  return (
    <div className='px-4 py-5 mx-auto md:px-24 lg:px-8 shadow-md'>
      <div className='relative flex items-center justify-around'>
        <a
          href='/'
          aria-label='EcommerceV2'
          title='EcommerceV2'
          className='inline-flex items-center'
        >
          <svg
            className='w-8 text-primary-600'
            viewBox='0 0 24 24'
            strokeLinejoin='round'
            strokeWidth='2'
            strokeLinecap='round'
            strokeMiterlimit='10'
            stroke='currentColor'
            fill='none'
          >
            <rect x='3' y='1' width='7' height='12' />
            <rect x='3' y='17' width='7' height='6' />
            <rect x='14' y='1' width='7' height='6' />
            <rect x='14' y='11' width='7' height='12' />
          </svg>
          <span className='ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase'>
            EcommerceV2
          </span>
        </a>
        <ul className='items-center hidden space-x-8 lg:flex'>
          {auth.isLoggedIn && (
            <div className='relative inline-block '>
              <button
                className='relative z-10 flex items-center p-2 text-sm text-primary-600 bg-white border border-transparent rounded-md  focus:outline-none '
                onClick={() => {
                  setProfileOpen(!profileOpen);
                }}
              >
                <span className='mx-1'>{auth.userInfo.name}</span>
                <svg
                  className='w-5 h-5 mx-1'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z'
                    fill='currentColor'
                  ></path>
                </svg>
              </button>
              <div
                className={`absolute z-20 w-56 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl ${
                  profileOpen ? 'block' : 'hidden'
                }`}
              >
                <a
                  href='/profile'
                  className='flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform hover:bg-gray-100'
                >
                  <div className='mx-1'>
                    <h1 className='text-sm font-semibold text-gray-700'>
                      {auth.userInfo.name}
                    </h1>
                    <p className='text-sm text-gray-500'>
                      {auth.userInfo.email}
                    </p>
                  </div>
                </a>

                <hr className='border-gray-200' />

                <a
                  href='/profile'
                  className='block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform hover:bg-gray-100'
                >
                  View profile
                </a>

                <a
                  href='/'
                  className='block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform  hover:bg-gray-100 '
                >
                  Settings
                </a>

                <span
                  className='cursor-pointer block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform hover:bg-gray-100 c'
                  onClick={logout}
                >
                  Sign Out
                </span>
              </div>
            </div>
          )}
          <li>
            <Link
              to='/cart'
              className='relative flex items-center md:mt-0 md:ml-4 cursor-pointer'
            >
              <img src={CartIcon} alt='Cart' className='w-8 h-8' />
              <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
                0
              </span>
            </Link>
          </li>
          <li>
            {!auth.isLoggedIn ? (
              <>
                <Link
                  to='/signin'
                  className='inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-primary-600 hover:bg-primary-900 focus:shadow-outline focus:outline-none'
                  aria-label='Sign up'
                  title='Sign up'
                >
                  Sign in
                </Link>
                <Link
                  to='/signup'
                  className='inline-flex mx-2 items-center justify-center h-12 px-6 font-medium tracking-wide text-primary-600 transition duration-200 rounded shadow-md bg-white hover:bg-gray-200 focus:shadow-outline focus:outline-none'
                  aria-label='Sign up'
                  title='Sign up'
                >
                  Sign up
                </Link>
              </>
            ) : (
              <Button
                onClick={logout}
                size='small'
                name='Log out'
                title='Logout'
                loading={false}
              >
                Logout
              </Button>
            )}
          </li>
        </ul>
        <div className='lg:hidden'>
          <button
            aria-label='Open Menu'
            title='Open Menu'
            className='p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50'
            onClick={() => setIsMenuOpen(true)}
          >
            <svg className='w-5 text-gray-600' viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                d='M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z'
              />
              <path
                fill='currentColor'
                d='M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z'
              />
              <path
                fill='currentColor'
                d='M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z'
              />
            </svg>
          </button>
          {isMenuOpen && (
            <div className='absolute top-0 left-0 w-full z-50'>
              <div className='p-5 bg-white border rounded shadow-sm'>
                <div className='flex items-center justify-between mb-4'>
                  <div>
                    <a
                      href='/'
                      aria-label='EcommerceV2'
                      title='EcommerceV2'
                      className='inline-flex items-center'
                    >
                      <svg
                        className='w-8 text-primary-600'
                        viewBox='0 0 24 24'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeMiterlimit='10'
                        stroke='currentColor'
                        fill='none'
                      >
                        <rect x='3' y='1' width='7' height='12' />
                        <rect x='3' y='17' width='7' height='6' />
                        <rect x='14' y='1' width='7' height='6' />
                        <rect x='14' y='11' width='7' height='12' />
                      </svg>
                      <span className='ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase'>
                        EcommerceV2
                      </span>
                    </a>
                  </div>
                  <div className='flex'>
                    <span className='relative flex items-center md:mt-0 md:ml-4 cursor-pointer mr-5'>
                      <img src={CartIcon} alt='Cart' className='w-8 h-8' />
                      <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
                        0
                      </span>
                    </span>
                    <button
                      aria-label='Close Menu'
                      title='Close Menu'
                      className='p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline'
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className='w-5 text-gray-600' viewBox='0 0 24 24'>
                        <path
                          fill='currentColor'
                          d='M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <nav>
                  <ul className='space-y-4'>
                    <li>
                      {!auth.isLoggedIn ? (
                        <div className='flex justify-end'>
                          <Link
                            to='/signin'
                            className='inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-primary-600 hover:bg-white hover:text-primary-600 focus:shadow-outline focus:outline-none'
                            aria-label='Sign up'
                            title='Sign up'
                          >
                            Sign in
                          </Link>
                          <Link
                            to='/signup'
                            className='inline-flex mx-2 items-center justify-center h-12 px-6 font-medium tracking-wide text-primary-600 transition duration-200 rounded shadow-md bg-white hover:bg-primary-600 hover:text-white focus:shadow-outline focus:outline-none'
                            aria-label='Sign up'
                            title='Sign up'
                          >
                            Sign up
                          </Link>
                        </div>
                      ) : (
                        <button
                          onClick={logout}
                          className='inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-primary-600 hover:bg-white hover:text-primary-600 focus:shadow-outline focus:outline-none'
                          aria-label='Log out'
                          title='Logout'
                        >
                          Logout
                        </button>
                      )}
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
      <Toast />
    </div>
  );
};

export default Navbar;

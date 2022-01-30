import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CartIcon from '../../../assets/images/icons/cart-icon.png';
import { logoutUser } from '../../../pages/Auth/helpers';
import Toast from '../../Toast';

const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
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
    <div className='w-full text-white bg-primary-600'>
      <div className='flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-8 lg:px-8'>
        <div className='py-6 px-3 flex flex-row items-center justify-between '>
          <Link
            to='/'
            className='text-lg font-semibold tracking-widest  uppercase rounded-lg focus:outline-none focus:shadow-outline'
          >
            Ecommerce V3
          </Link>
          {open && (
            <span className='relative flex items-center md:mt-0 md:ml-4'>
              <img src={CartIcon} alt='Cart' className='w-6 h-6' />
              <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
                0
              </span>
            </span>
          )}
          <button
            className='md:hidden rounded-lg focus:outline-none focus:shadow-outline'
            onClick={() => setOpen(!open)}
          >
            <svg fill='currentColor' viewBox='0 0 20 20' className='w-6 h-6'>
              {!open && (
                <path
                  x-show='!open'
                  fillRule='evenodd'
                  d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z'
                  clipRule='evenodd'
                ></path>
              )}
              {open && (
                <path
                  x-show='open'
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                ></path>
              )}
            </svg>
          </button>
        </div>
        <nav
          className={`flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row ${
            open ? 'flex' : 'hidden'
          }`}
        >
          {!auth.isLoggedIn ? (
            <>
              <Link
                className='px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg  md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline'
                to='/signup'
              >
                Signup
              </Link>
              <Link
                className='px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg  md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline'
                to='/signin'
              >
                Signin
              </Link>
            </>
          ) : (
            <div className='relative inline-block '>
              <button
                className='relative z-10 flex items-center p-2 text-sm text-white bg-primary-600 border border-transparent rounded-md  focus:outline-none '
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
                className={`absolute sm:left-5 md:right-20 z-20 w-56 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl ${
                  profileOpen ? 'block' : 'hidden'
                }`}
              >
                <a
                  href='/'
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
                  href='/'
                  className='block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform hover:bg-gray-100'
                >
                  view profile
                </a>

                <a
                  href='/'
                  className='block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform  hover:bg-gray-100 '
                >
                  Settings
                </a>

                <span
                  className='block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform hover:bg-gray-100 cursor-pointer'
                  onClick={logout}
                >
                  Sign Out
                </span>
              </div>
            </div>
          )}

          {!open && (
            <span className='relative flex items-center md:mt-0 md:ml-4 cursor-pointer'>
              <img src={CartIcon} alt='Cart' className='w-6 h-6' />
              <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
                0
              </span>
            </span>
          )}
        </nav>
      </div>
      <Toast />
    </div>
  );
};

export default Navbar;

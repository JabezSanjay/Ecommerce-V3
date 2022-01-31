import React from 'react';
import Navbar from '../../components/Layout/Navbar';

const Cart = () => {
  return (
    <>
      <Navbar />
      <div class='w-full h-full bg-opacity-90 mt-3' id='chec-div'>
        <div
          class='w-full  overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700'
          id='checkout'
        >
          <div
            class='flex items-center flex-wrap lg:flex-row flex-col justify-center'
            id='cart'
          >
            <div
              class='lg:w-1/2 md:w-8/12 w-full lg:px-8  md:px-6 px-4 md:py-8 py-4 bg-white h-auto'
              id='scroll'
            >
              <p class='lg:text-4xl text-3xl font-black leading-10 text-primary-600 pt-3'>
                Bag
              </p>
              <div class='md:flex items-strech py-8 md:py-10 lg:py-8'>
                <div class='md:w-4/12 2xl:w-1/4 w-full'>
                  <img
                    src='https://i.ibb.co/SX762kX/Rectangle-36-1.png'
                    alt='Black Leather Bag'
                    class='h-full object-center object-cover md:block hidden'
                  />
                  <img
                    src='https://i.ibb.co/g9xsdCM/Rectangle-37.pngg'
                    alt='Black Leather Bag'
                    class='md:hidden w-full h-full object-center object-cover'
                  />
                </div>
                <div class='md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center'>
                  <div class='flex items-center justify-between w-full pt-1'>
                    <p class='text-base font-black leading-none text-primary-600'>
                      North wolf bag
                    </p>
                    <select
                      aria-label='Select quantity'
                      class='py-2 px-1 border border-gray-200 mr-6 focus:outline-none'
                    >
                      <option>01</option>
                      <option>02</option>
                      <option>03</option>
                    </select>
                  </div>
                  <p class='text-xs leading-3 text-gray-600 pt-2'>
                    Height: 10 inches
                  </p>
                  <p class='text-xs leading-3 text-gray-600  py-4'>
                    Color: Black
                  </p>
                  <p class='w-96 text-xs leading-3 text-gray-600 '>
                    Composition: 100% calf leather
                  </p>
                  <div class='flex items-center justify-between pt-5'>
                    <div class='flex itemms-center'>
                      <p class='text-xs leading-3 underline cursor-pointer'>
                        Add to favorites
                      </p>
                      <p class='text-xs leading-3 underline text-red-500 pl-5 cursor-pointer'>
                        Remove
                      </p>
                    </div>
                    <p class='text-base font-black leading-none text-primary-600 '>
                      $9,000
                    </p>
                  </div>
                </div>
              </div>
              <div class='md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50'>
                <div class='md:w-4/12 2xl:w-1/4 w-full'>
                  <img
                    src='https://i.ibb.co/c6KyDXN/Rectangle-5-1.png'
                    alt='Gray Sneakers'
                    class='h-full object-center object-cover md:block hidden'
                  />
                  <img
                    src='https://i.ibb.co/yVSpYqx/Rectangle-6.png'
                    alt='Gray Sneakers'
                    class='md:hidden w-full h-full object-center object-cover'
                  />
                </div>
                <div class='md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center'>
                  <div class='flex items-center justify-between w-full pt-1'>
                    <p class='text-base font-black leading-none text-primary-600'>
                      LW sneakers
                    </p>
                    <select
                      aria-label='Select quantity'
                      class='py-2 px-1 border border-gray-200 mr-6 focus:outline-none'
                    >
                      <option>01</option>
                      <option>02</option>
                      <option>03</option>
                    </select>
                  </div>
                  <p class='text-xs leading-3 text-gray-600 pt-2'>
                    Height: 10 inches
                  </p>
                  <p class='text-xs leading-3 text-gray-600 py-4'>
                    Color: Black
                  </p>
                  <p class='w-96 text-xs leading-3 text-gray-600 '>
                    Composition: 100% calf leather
                  </p>
                  <div class='flex items-center justify-between pt-5'>
                    <div class='flex itemms-center'>
                      <p class='text-xs leading-3 underline cursor-pointer'>
                        Add to favorites
                      </p>
                      <p class='text-xs leading-3 underline text-red-500 pl-5 cursor-pointer'>
                        Remove
                      </p>
                    </div>
                    <p class='text-base font-black leading-none text-primary-600 '>
                      $9,000
                    </p>
                  </div>
                </div>
              </div>
              <div class='md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50'>
                <div class='md:w-4/12 2xl:w-1/4 w-full'>
                  <img
                    src='https://i.ibb.co/6gzWwSq/Rectangle-20-1.png'
                    alt='Black Leather Purse'
                    class='h-full object-center object-cover md:block hidden'
                  />
                  <img
                    src='https://i.ibb.co/TTnzMTf/Rectangle-21.png'
                    alt='Black Leather Purse'
                    class='md:hidden w-full h-full object-center object-cover'
                  />
                </div>
                <div class='md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center'>
                  <div class='flex items-center justify-between w-full'>
                    <p class='text-base font-black leading-none text-primary-600 '>
                      Luxe card holder
                    </p>
                    <select
                      aria-label='Select quantity'
                      class='py-2 px-1 border border-gray-200 mr-6 focus:outline-none'
                    >
                      <option>01</option>
                      <option>02</option>
                      <option>03</option>
                    </select>
                  </div>
                  <p class='text-xs leading-3 text-gray-600  pt-2'>
                    Height: 10 inches
                  </p>
                  <p class='text-xs leading-3 text-gray-600  py-4'>
                    Color: Black
                  </p>
                  <p class='w-96 text-xs leading-3 text-gray-600 '>
                    Composition: 100% calf leather
                  </p>
                  <div class='flex items-center justify-between pt-5'>
                    <div class='flex itemms-center'>
                      <p class='text-xs leading-3 underline  cursor-pointer'>
                        Add to favorites
                      </p>
                      <p class='text-xs leading-3 underline text-red-500 pl-5 cursor-pointer'>
                        Remove
                      </p>
                    </div>
                    <p class='text-base font-black leading-none text-primary-600 '>
                      $9,000
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class='lg:w-96 md:w-8/12 w-full bg-primary-600 h-full'>
              <div class='flex flex-col lg:px-8 md:px-7 px-4 lg:py-20 md:py-10 py-6 justify-between'>
                <div>
                  <p class='lg:text-4xl text-3xl font-black leading-9 text-white '>
                    Summary
                  </p>
                  <div class='flex items-center justify-between pt-16'>
                    <p class='text-base leading-none text-white '>Subtotal</p>
                    <p class='text-base leading-none text-white '>$9,000</p>
                  </div>
                  <div class='flex items-center justify-between pt-5'>
                    <p class='text-base leading-none text-white'>Shipping</p>
                    <p class='text-base leading-none text-primary-600 '>$30</p>
                  </div>
                  <div class='flex items-center justify-between pt-5'>
                    <p class='text-base leading-none text-white'>Tax</p>
                    <p class='text-base leading-none text-white'>$35</p>
                  </div>
                </div>
                <div>
                  <div class='flex items-center pb-6 justify-between lg:pt-5 pt-20'>
                    <p class='text-2xl leading-normal text-white'>Total</p>
                    <p class='text-2xl font-bold leading-normal text-right text-white'>
                      $10,240
                    </p>
                  </div>
                  <button class='text-lg font-bold leading-none w-full py-5 bg-white border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-primary-600'>
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

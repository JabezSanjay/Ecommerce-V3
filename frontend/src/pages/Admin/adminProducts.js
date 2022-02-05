import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Layout/Navbar';
import Sidebar from '../../components/Sidebar';
import DataTableCrudDemo from '../../components/TableLayout';

const AdminProducts = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <>
      <div id='outer-container'>
        <Navbar />
        <Sidebar page='products' userType={auth?.userInfo?.role}>
          <div
            className='container mx-auto py-10 md:w-4/5 w-11/12 px-6'
            id='page-wrap'
          >
            <div className='w-full h-full'>
              <div className='flex flex-col items-end p-5'>
                <DataTableCrudDemo />
              </div>
            </div>
          </div>
        </Sidebar>
      </div>
    </>
  );
};

export default AdminProducts;

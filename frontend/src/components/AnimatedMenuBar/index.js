import React from 'react';
import { push as Menu } from 'react-burger-menu';
import { useSelector } from 'react-redux';
import Button from '../Button';
import Input from '../Input';
import './index.css';

const AnimatedMenuBar = (props) => {
  const auth = useSelector((state) => state.auth);
  return (
    <Menu {...props} width={'100%'} className='bg-primary-600'>
      <div className='container mx-auto md:w-4/5 w-11/12'>
        <div className='w-full h-full'>
          <div className='flex flex-col justify-start items-center'>
            <h3 className='text-xl'>Create Product!</h3>
          </div>
          <div className='flex flex-wrap justify-evenly items-center'>
            <div className='lg:w-2/6 w-full mt-2'>
              <form>
                <Input
                  type='text'
                  name='Product Name'
                  placeholder='Product name'
                  size='large'
                  className='mr-12 text-secondary-500'
                />
                <Input
                  type='text'
                  name='Product Description'
                  placeholder='Product description'
                  size='large'
                  //   formValidation={{ ...updateNameRegister('name') }}
                  //   formInputName='name'
                  //   errorText={errors.name?.message}
                  //   register={updateNameRegister}
                  //   error={errors}
                />
                <Input
                  type='number'
                  name='Product Price'
                  placeholder='Product price'
                  size='large'
                  //   formValidation={{ ...updateNameRegister('name') }}
                  //   formInputName='name'
                  //   errorText={errors.name?.message}
                  //   register={updateNameRegister}
                  //   error={errors}
                />
                <Input
                  type='text'
                  name='Product Category'
                  placeholder='Product category'
                  size='large'
                  //   formValidation={{ ...updateNameRegister('name') }}
                  //   formInputName='name'
                  //   errorText={errors.name?.message}
                  //   register={updateNameRegister}
                  //   error={errors}
                />
                {/* <Button name='Update Name' loading={updateUserState.loading} /> */}
              </form>
            </div>
            <div className='lg:w-2/6 w-full mt-3'>
              <form
              // onSubmit={changePasswordHandleSubmit(onChangePasswordSubmit)}
              >
                <div className='flex flex-col'>
                  <Input
                    type='text'
                    name='Product Brand'
                    placeholder='Product brand'
                    size='large'
                    className='mr-12'
                    // formValidation={
                    //   {
                    //     //   ...changePasswordRegister('oldPassword'),
                    //   }
                    // }
                    // formInputName='oldPassword'
                    // errorText={changePasswordErrors?.oldPassword?.message}
                    // register={changePasswordRegister}
                    // error={changePasswordErrors}
                  />
                  <Input
                    type='number'
                    name='Product Stock'
                    placeholder='Product stock'
                    size='large'
                    // formValidation={{
                    //   ...changePasswordRegister('newPassword'),
                    // }}
                    // formInputName='newPassword'
                    // errorText={changePasswordErrors?.newPassword?.message}
                    // register={changePasswordRegister}
                    // error={changePasswordErrors}
                  />
                  <Input
                    type='file'
                    name='Product Stock'
                    placeholder='Product stock'
                    size='large'
                    // formValidation={{
                    //   ...changePasswordRegister('newPassword'),
                    // }}
                    // formInputName='newPassword'
                    // errorText={changePasswordErrors?.newPassword?.message}
                    // register={changePasswordRegister}
                    // error={changePasswordErrors}
                  />
                  <Button
                    name='Create Product'
                    loading={false}
                    className='bg-white'
                    size='large'
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Menu>
  );
};

export default AnimatedMenuBar;

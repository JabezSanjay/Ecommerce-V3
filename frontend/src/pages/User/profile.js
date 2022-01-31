import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Navbar from '../../components/Layout/Navbar';
import Sidebar from '../../components/Sidebar';
import { updateUser } from './helpers';
import Toast from '../../components/Toast';
import { signinUserSuccess } from '../../redux/reducers/authReducer';

const Profile = () => {
  const updateNameSchema = yup
    .object({
      name: yup
        .string()
        .required('Name is required!')
        .min(3, 'Name must be atleast 3 characters long!'),
    })
    .required();

  const updateShippingDetailsSchema = yup
    .object({
      address: yup
        .string()
        .required('Address is required!')
        .min(6, 'Name must be atleast 6 characters long!'),
      city: yup
        .string()
        .required('City is required!')
        .min(3, 'City must be atleast 3 characters long!'),
      state: yup
        .string()
        .required('State is required!')
        .min(3, 'State must be atleast 3 characters long!'),
      pincode: yup
        .string()
        .required('Zip is required!')
        .min(3, 'Zip must be atleast 3 characters long!'),
      country: yup
        .string()
        .required('Country is required!')
        .min(3, 'Country must be atleast 3 characters long!'),
    })
    .required();

  const {
    register: updateNameRegister,
    handleSubmit: updateNameHandleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateNameSchema),
  });
  const {
    register: updateShippingInfoRegister,
    handleSubmit: updateShippingInfoHandleSubmit,
    formState: { errors: updateShippingInfoErrors },
  } = useForm({
    resolver: yupResolver(updateShippingDetailsSchema),
  });
  const auth = useSelector((state) => state.auth);
  const updateUserState = useSelector((state) => state.updateUser);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    let userData;
    if (data?.address) {
      userData = {
        shippingInfo: data,
      };
    }
    updateUser(userData, dispatch).then((response) => {
      if (!response.success) {
        toast.error(response.message);
      } else {
        dispatch(signinUserSuccess(response.data));
        toast.success('User updated successfully!');
      }
    });
  };

  return (
    <>
      <Navbar />
      <Sidebar page='profile'>
        <div className='container mx-auto py-10 md:w-4/5 w-11/12 px-6'>
          <div className='w-full h-full'>
            <div className='flex flex-col justify-start items-end p-5'>
              <h3 className='text-lg'>
                Welcome
                <span className='text-primary-600'> {auth.userInfo.name}!</span>
              </h3>
            </div>
            <div className='flex flex-wrap justify-evenly items-center'>
              <div className='lg:w-2/6 w-full mt-6'>
                <h4 className='text-xl'>Basic User Information</h4>
                <form onSubmit={updateNameHandleSubmit(onSubmit)}>
                  <Input
                    type='email'
                    name='Email'
                    placeholder='Email'
                    disabled={true}
                    value={auth.userInfo.email}
                    size='large'
                    className='mr-12'
                  />
                  <Input
                    type='name'
                    name='Name'
                    placeholder='Name'
                    size='large'
                    formValidation={{ ...updateNameRegister('name') }}
                    formInputName='name'
                    errorText={errors.name?.message}
                    register={updateNameRegister}
                    error={errors}
                    value={auth.userInfo.name}
                  />
                  <Button
                    name='Update Name'
                    loading={updateUserState.loading}
                  />
                </form>
              </div>
              <div className='lg:w-2/6 w-full mt-6'>
                <h4 className='text-xl'>Change Password</h4>
                <div className='flex flex-col'>
                  <Input
                    type='password'
                    name='Old Password'
                    placeholder='Enter your old password!'
                    size='large'
                    className='mr-12'
                  />
                  <Input
                    type='password'
                    name='New Password'
                    placeholder='Enter your new password!'
                    size='large'
                  />
                  <Button name='Update Password' loading={false} />
                </div>
              </div>
            </div>
            <form onSubmit={updateShippingInfoHandleSubmit(onSubmit)}>
              <div className='flex flex-wrap justify-evenly items-center mt-6'>
                <div className='w-full lg:w-2/6 mt-6'>
                  <h4 className='text-xl'>Shipping Details</h4>
                  <div className='flex flex-col'>
                    <Input
                      type='text'
                      name='Address'
                      placeholder='Enter your address!'
                      size='large'
                      className='mr-12'
                      formValidation={{
                        ...updateShippingInfoRegister('address'),
                      }}
                      formInputName='address'
                      errorText={updateShippingInfoErrors.address?.message}
                      register={updateShippingInfoRegister}
                      error={updateShippingInfoErrors}
                      value={auth.userInfo?.shippingInfo?.address || ''}
                    />
                    <Input
                      type='text'
                      name='City'
                      placeholder='Enter your city!'
                      size='large'
                      formValidation={{
                        ...updateShippingInfoRegister('city'),
                      }}
                      formInputName='city'
                      errorText={updateShippingInfoErrors.city?.message}
                      register={updateShippingInfoRegister}
                      error={updateShippingInfoErrors}
                      value={auth.userInfo?.shippingInfo?.city || ''}
                    />
                    <Input
                      type='text'
                      name='State'
                      placeholder='Enter your state!'
                      size='large'
                      formValidation={{
                        ...updateShippingInfoRegister('state'),
                      }}
                      formInputName='state'
                      errorText={updateShippingInfoErrors.state?.message}
                      register={updateShippingInfoRegister}
                      error={updateShippingInfoErrors}
                      value={auth.userInfo?.shippingInfo?.state || ''}
                    />
                  </div>
                </div>
                <div className='w-full lg:w-2/6'>
                  <div className='flex flex-col'>
                    <Input
                      type='text'
                      name='Country'
                      placeholder='Enter your country!'
                      size='large'
                      className='mr-12'
                      formValidation={{
                        ...updateShippingInfoRegister('country'),
                      }}
                      formInputName='country'
                      errorText={updateShippingInfoErrors.country?.message}
                      register={updateShippingInfoRegister}
                      error={updateShippingInfoErrors}
                      value={auth.userInfo?.shippingInfo?.country || ''}
                    />
                    <Input
                      type='text'
                      name='Pincode'
                      placeholder='Enter your pincode!'
                      size='large'
                      formValidation={{
                        ...updateShippingInfoRegister('pincode'),
                      }}
                      formInputName='pincode'
                      errorText={updateShippingInfoErrors.pincode?.message}
                      register={updateShippingInfoRegister}
                      error={updateShippingInfoErrors}
                      value={auth.userInfo?.shippingInfo?.pincode || ''}
                    />
                    <Button name='Update Address' loading={false} />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Sidebar>
      <Toast />
    </>
  );
};

export default Profile;

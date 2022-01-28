import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import SigninImage from '../../assets/images/auth/signin-page.jpeg';
import GoogleIcon from '../../assets/images/icons/google-icon.png';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Navbar from '../../components/Layout/Navbar';
import { signinUser } from './helpers';
import { useDispatch, useSelector } from 'react-redux';
import Toast from '../../components/Toast';
import AuthCard from '../../components/AuthCard';

const schema = yup
  .object({
    email: yup
      .string()
      .email('Enter a valid email!')
      .required('Email is required!'),
    password: yup.string().required('Password is required!'),
  })
  .required();
const Signin = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    await signinUser(data, dispatch).then((response) => {
      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success('User signin successful!');
      }
    });
  };
  return (
    <>
      <Navbar />
      <AuthCard>
        {' '}
        <div className='h-32 md:h-auto md:w-1/2'>
          <img
            className='object-cover w-full h-full'
            src={SigninImage}
            alt='img'
          />
        </div>
        <div className='flex items-center justify-center p-6 sm:p-12 md:w-1/2'>
          <div className='w-full'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className='mb-4 text-2xl font-bold text-center text-gray-700'>
                Sign in
              </h1>
              <div>
                <Input
                  type='email'
                  name='Email'
                  placeholder='Enter your email'
                  formValidation={{ ...register('email') }}
                  formInputName='email'
                  errorText={errors.email?.message}
                  register={register}
                  error={errors}
                />
                <Input
                  type='password'
                  name='Password'
                  placeholder='Enter your password'
                  formValidation={{ ...register('password') }}
                  formInputName='password'
                  errorText={errors.password?.message}
                  register={register}
                  error={errors}
                />
              </div>
              <Button
                name='Sign in'
                onClick={() => setSubmitted(!submitted)}
                loading={auth.loading}
              />
            </form>
            <div className='mt-3 text-center'>
              <span className='font-medium text-gray-500 text-sm'>Or</span>
              <div className='flex flex-col items-center'>
                <button className='w-full font-semibold rounded-lg py-1 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm my-3'>
                  <span className='bg-white p-2 rounded-full'>
                    <img src={GoogleIcon} className='w-4' alt='' />
                  </span>
                  <span className='ml-4'>Sign in with Google</span>
                </button>
              </div>
            </div>
            <div className='mt-4 text-center'>
              <p className='text-sm'>
                Don't have an account?
                <Link
                  to='/signup'
                  className='text-primary-600 hover:underline ml-2'
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </AuthCard>
      <Toast />
    </>
  );
};

export default Signin;

import LoginGoogleButton from '@/components/login-button'
import React from 'react'
import { Metadata } from 'next';

export const metadata:Metadata ={
    title: "sign in",

};

const SignIn = () => {
  return (
    <div className='min-h-screen flex items-center'>
        <div className='bg-white w-96 mx-auto roundes-sm shadow p-8'>
            <h1 className='text-4xl font-bold mb-1'>Sign In</h1>
            <p className='font-medium mb-5 text-gray-500'>SignIn To Youre Account</p>
            <div className='py-4 text-center'>
            <LoginGoogleButton/>
            </div>
        </div>

    </div>
  )
}

export default SignIn;
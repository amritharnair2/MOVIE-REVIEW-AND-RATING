import React from 'react'
import { Outlet } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';

function UserLayout() {
  return (
    <div className="flex w-full max-w-screen min-h-screen flex-col">
      
      <Header />
      
      <main className='flex-grow px-6 md:px-12 lg:px-20 p-4 hero bg-base-200 flex items-center justify-cente'>
        <Outlet /> 
      </main>
      
      <Footer />
    </div>
  )
}

export default UserLayout

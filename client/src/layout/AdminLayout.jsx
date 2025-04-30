import React from 'react'
import { Outlet } from "react-router-dom";
import AdminHeader from '../components/Admin/AdminHeader';
import AdminFooter from '../components/Admin/AdminFooter';

function AdminLayout() {
  return (
    <div className="flex w-full max-w-screen min-h-screen flex-col max-w-screen p-0 m-0"> 
      <AdminHeader />
      <main className='flex-grow bg-base-100 px-8 py-2 mt-0'>
        <Outlet /> 
      </main>
      <AdminFooter />
    </div>
  )
}

export default AdminLayout
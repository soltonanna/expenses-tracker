import React from 'react';
import { Outlet } from 'react-router-dom';
import AuthNavigation from '../../components/nav/AuthNavigation';

const AuthRootRouter = () => {
  return (
    <>
        <AuthNavigation />
        <Outlet />
    </>
  )
}

export default AuthRootRouter
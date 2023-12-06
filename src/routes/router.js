import React from "react";
import { createBrowserRouter } from "react-router-dom";

import RootRouter from "../pages/routers/RootRouter";
import AuthRootRouter from "../pages/routers/AuthRootRouter";

import Homepage from "../pages/Homepage";
import Profile from "../pages/Profile";

import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import ForgotPass from "../pages/auth/ForgotPass";

const router = createBrowserRouter([
    { 
        path: '/', 
        element: <RootRouter/>, 
        children: [
            { index: true, element: <Homepage/> },
            { path: 'profile', element: <Profile/> },
            { 
                path: 'auth', 
                element: <AuthRootRouter/>,
                children: [
                    { path: 'login', element: <Login /> },
                    { path: 'signup', element: <SignUp /> },
                    { path: 'forgot-password', element: <ForgotPass /> },
                ]
            }
        ]
    }
]);

export default router;
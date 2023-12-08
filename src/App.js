import React from "react";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PrivateRoute } from "./routes/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

import Header from './components/Header';
import Footer from './components/Footer';

import Homepage from './pages/Homepage';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import ForgotPass from './pages/auth/ForgotPass';
import Profile from './pages/Profile';
import NotFound from "./pages/NotFound";

function App() {
    return (
      <Router>
        <AuthProvider>
          <Header />

          <Routes>
            <Route path = '/' exact element = { <Homepage /> } />
            <Route path = '/login' element = { <Login /> } />
            <Route path = '/signup' element = { <SignUp /> } />
            <Route path = '/forgot-password' element = { <ForgotPass /> } />

            <Route exact path = '/' element = { <PrivateRoute/> }>
              <Route path = '/profile' element = { <Profile /> } />
            </Route>
            <Route path = '*' element = { <NotFound /> } />
          </Routes>

          <Footer />
        </AuthProvider>
      </Router>
    );
}

export default App;
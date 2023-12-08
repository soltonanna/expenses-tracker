import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Container';
import { LoginPageBg } from '../../utils/media-files';

/** Fonts */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

/** Form Items */
import Form from '../../components/form/Form';
import ItemBlock from '../../components/form/ItemBlock';
import Button from '../../components/form/Button';

import AuthContext from '../../context/AuthContext';

const Login = () => {
  
  const [credentials, setCredentials] = useState({ password: '', username: '' });
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const { loginCurrentUser } = useContext(AuthContext);
  
  /** States of form content */
  const submitHandler = (e) => {
    e.preventDefault();

    loginCurrentUser(credentials);
  }

  /** Password's icon visibility */
  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };
  const eye = <FontAwesomeIcon icon = { passwordVisibility ? faEyeSlash : faEye } />;
  
  return (
    <Container className='login-page'>

      <div className='login-page__back-image'>
        <img src={ LoginPageBg } alt='Login Page' />
      </div>

      <div className='login-page__form'>
        <h2>Login</h2>
        <p>Sign in to your account to continue.</p>

        <Form onSubmit = { submitHandler }>
          <ItemBlock 
            className = 'row'
            type =  'email'
            placeholder = '* E-Mail'
            name = 'username'
            value = { credentials.username }
            required
            onChange = { e => setCredentials({...credentials, username: e.target.value}) }
          />

          <ItemBlock 
            className = 'row'
            type = { passwordVisibility ? 'text' : 'password' } 
            placeholder = '* Password'
            value = { credentials.password }
            name = 'password'
            required
            onChange = { e => setCredentials({...credentials, password: e.target.value}) }
            onIconClick = { togglePasswordVisibility }
            icon = { eye }
          />

          <div>
            <Link to='/forgot-password'> Forgot your password? </Link>
            <p>Not registered? <Link to='/signup'> Create account </Link></p>
          </div>
          
          <Button type = 'submit' >Login</Button>
        </Form>
      </div>
     
      

    </Container>
  )
}

export default Login;
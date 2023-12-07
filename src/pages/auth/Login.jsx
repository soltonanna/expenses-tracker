import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Container';
import { AuthPageBg } from '../../utils/media-files';

/** Fonts */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

/** Form Items */
import Form from '../../components/form/Form';
import ItemBlock from '../../components/form/ItemBlock';
import Button from '../../components/form/Button';

const Login = () => {
  /** Password's icon visibility */
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };
  const eye = <FontAwesomeIcon icon = { passwordVisibility ? faEyeSlash : faEye } />;


  const [login, setLogin] = useState({
    email: '', 
    password: '',
  });

  return (
    <Container className='login-page'>

      <div className='login-page__back-image'>
        <img src={ AuthPageBg } alt='Login Page' />
      </div>

      <div className='login-page__form'>
        <Form id='login-form' >
          <ItemBlock 
            className = 'row'
            type =  'email'
            placeholder = '* E-Mail'
            name = 'useremail'
            value = { login.email }
            required
            onChange = { e => setLogin({...login, email: e.target.value}) }
          />

          <ItemBlock 
            className = 'row'
            type = { passwordVisibility ? 'text' : 'password' } 
            placeholder = '* Password'
            value = { login.password }
            name = 'userpassword'
            required
            onChange = { e => setLogin({...login, password: e.target.value}) }
            onIconClick = { togglePasswordVisibility }
            icon = { eye }
          />

          <div>
            <Link to='/forgot-password'> Forgot your password? </Link>
            <p>Don't have an account ? <Link to='/signup'> Register now </Link></p>
          </div>
          
          <Button type = 'submit' >Login</Button>
        </Form>
      </div>
     
      

    </Container>
  )
}

export default Login;
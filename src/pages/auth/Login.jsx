import React, { useState } from 'react';
import Container from '../../components/Container';

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
    <Container className = 'login-page'>
      
      <Form id ='login-form' >
            
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
               <a href = '/auth/forgot-password'> Forgot your password? </a>
               <p>Don't have an account ? <a href = '/auth/signup'> Register now </a></p>
            </div>
            
            <Button type = 'submit' >Login</Button>
         </Form>

    </Container>
  )
}

export default Login;
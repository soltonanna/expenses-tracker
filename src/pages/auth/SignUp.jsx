import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import Container from '../../components/Container';
import { SignUpPageBg } from '../../utils/media-files';

/** Fonts */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

/** Form Items */
import Form from '../../components/form/Form';
import ItemBlock from '../../components/form/ItemBlock';
import Button from '../../components/form/Button';

/** API Services */
import UsersService from '../../services/users.service';

const SignUp = () => {
  
  const [register, setRegister] = useState({ email: '', firstName: '', lastName: '',  password: '' });
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const navigate = useNavigate();

  /** States of form content */
  const submitHandler = async (e) => {
    e.preventDefault();

    if ( register.firstName.trim().length === 0 || register.lastName.trim().length === 0 || register.email.trim().length === 0 || register.password.trim().length === 0 )  { 
      alert('Invalid input', 'Please fill the required files marked with * (non-empty values).');
      return;
    } else {

      try {
        const result = await UsersService.signup(register);
        console.log("Signup result:", result);
        // Reset fields
        setRegister({ firstName: '', lastName: '', email: '', password: '' });

        navigate('/login');

      } catch (error) {
        console.error("Error during sign up:", error.message);
      }
    }
  }

  /** Password's icon visibility */
  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };
  const eye = <FontAwesomeIcon icon={ passwordVisibility ? faEyeSlash : faEye } />;

  return (
    <Container className='signup-page'>
      <div className='signup-page__back-image'>
        <img src = { SignUpPageBg } alt = 'Signup Page' />
      </div>

      <div className = 'signup-page__form'>
        <h2> Create account </h2>
        <p>Free access to our dashboard.</p>
        
        <Form onSubmit  =  { submitHandler }>
          <ItemBlock 
            className = 'row'
            type =  'email'
            placeholder = '* E-Mail'
            value = { register.email }
            required
            onChange = { e => setRegister({...register, email: e.target.value}) }
          />

          <ItemBlock 
            className = 'row'
            type =  'text'
            placeholder = '* First Name'
            value = { register.firstName }
            required
            onChange = { e => setRegister({...register, firstName: e.target.value}) }
          />

          <ItemBlock 
            className = 'row'
            type =  'text'
            placeholder = '* Last Name'
            value = { register.lastName }
            required
            onChange = { e => setRegister({...register, lastName: e.target.value}) }
          />

          

          <ItemBlock 
            className = 'row'
            type = { passwordVisibility ? 'text' : 'password' } 
            placeholder = '* Password'
            value = { register.password }
            required
            onChange = { e => setRegister({...register, password: e.target.value}) }
            onIconClick = { togglePasswordVisibility }
            icon = { eye }
          />

          <Button type = 'submit'>Sign up</Button>

          <div>
            <p>Already have an account?<Link to='/login'> Log In </Link></p>
          </div>
        </Form>
      </div>
    </Container>
  )
}

export default SignUp;
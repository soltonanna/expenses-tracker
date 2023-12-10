import React, { useRef, useState, useEffect, useContext } from 'react';
import { Link, useNavigate} from 'react-router-dom';

import Container from '../../components/Container';

/** Utils */
import { SignUpPageBg } from '../../utils/media-files';
import {
  USER_REGEX,
  USER_ERROR_MESSAGE,
  EMAIL_REGEX, 
  EMAIL_ERROR_MESSAGE, 
  PWD_REGEX, 
  PWD_ERROR_MESSAGE,
  SUBMIT_ERROR_MESSAGE 
} from '../../utils/regex';

/** Fonts */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

/** Form Items */
import Form from '../../components/form/Form';
import ItemBlock from '../../components/form/ItemBlock';
import Button from '../../components/form/Button';

/** API Services */
import UsersService from '../../services/users.service';

/** Use data from context */
import AuthContext from '../../context/AuthContext';

const SignUp = () => {
  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: '', firstName: '', lastName: '',  password: '' });
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  /** For REGEX */
  const [validEmail, setValidEmail] = useState(false);
  const [userEmailFocus, setUserEmailFocus] = useState(false);

  const [validName, setValidName] = useState(false);
  const [userNameFocus, setUserNameFocus] = useState(false);

  const [validSName, setValidSName] = useState(false);
  const [userSNameFocus, setUserSNameFocus] = useState(false);

  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');

  /** Icons visibility */
  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };
  const eye = <FontAwesomeIcon icon={ passwordVisibility ? faEyeSlash : faEye } />;

  /** Set the user input on focus after component load */
  useEffect(()=> {
    userRef.current.focus();
  }, []);

  /** Check validations */
  useEffect(()=> {
    setValidEmail(EMAIL_REGEX.test(credentials.email));
  }, [credentials.email]);

  useEffect(()=> {
    setValidName(USER_REGEX.test(credentials.firstName));
    setValidSName(USER_REGEX.test(credentials.lastName));
  }, [credentials.firstName, credentials.lastName]);

  useEffect(()=> {
    setValidPwd(PWD_REGEX.test(credentials.password));
  }, [credentials.password]);

  useEffect(()=> {
    setErrMsg('');
  }, [credentials.email, credentials.firstName, credentials.lastName, credentials.password]);

  /** Use Context data */
  const {signInCurrentUser, success, user } = useContext(AuthContext);

  /** States of form content */
  const submitHandler = (e) => {
    e.preventDefault();

    if (!EMAIL_REGEX.test(credentials.email) || !USER_REGEX.test(credentials.firstName) || !USER_REGEX.test(credentials.lastName) || !PWD_REGEX.test(credentials.password)) {
      setErrMsg(SUBMIT_ERROR_MESSAGE);
      return;
    }
    
    signInCurrentUser(credentials);
  }


  return (
    <Container className='signup-page'>
      <div className='signup-page__back-image'>
        <img src={ SignUpPageBg } alt='Signup Page' />
      </div>

      <>
      {
        success ? (
          <div className='signup-page__success'>
            <h2>Congratulations ! 🎉</h2>
            <p>You've successfully created an account with "Expenses Tracker App"! </p>
            <p>Feel free to explore your profile, customize your settings, and get started on your "Expenses Tracker App" adventure.</p> 
            <p>Lets go<Link to='/login'> Login </Link> and start!</p>
          </div>
        ) : (
          <div className='signup-page__form'>
            <h2> Create account </h2>
            <p>Free access to our dashboard.</p>
            
            <Form onSubmit = { submitHandler }>
              <ItemBlock 
                type= 'email'
                ref={userRef}
                autoComplete='off'
                onChange={ e => setCredentials({...credentials, email: e.target.value}) }
                value={ credentials.email }
                placeholder='* E-Mail'
                required
                className='row' 
                aria-invalid= { validEmail ? 'false' : 'true' }
                aria-describedby='uidnote'
                onFocus={() => setUserEmailFocus(true)}
                onBlur={() => setUserEmailFocus(false)}

                iconContent={<FontAwesomeIcon icon={faInfoCircle} />}
                iconClassName={userEmailFocus && credentials.email && !validEmail ? 'instructions' : 'offscreen'}
                errorMessage={EMAIL_ERROR_MESSAGE}
                errorId='uidnote'
              />

              <ItemBlock 
                type= 'text'
                autoComplete='off'
                onChange={ e => setCredentials({...credentials, firstName: e.target.value}) }
                value={ credentials.firstName }
                placeholder='* First Name'
                required
                className='row' 
                aria-invalid= { validName ? 'false' : 'true' }
                aria-describedby='namenote'
                onFocus={() => setUserNameFocus(true)}
                onBlur={() => setUserNameFocus(false)}

                iconContent={<FontAwesomeIcon icon={faInfoCircle} />}
                iconClassName={userNameFocus && credentials.firstName && !validName ? 'instructions' : 'offscreen'}
                errorMessage={USER_ERROR_MESSAGE}
                errorId='namenote'
              />

              <ItemBlock 
                type= 'text'
                autoComplete='off'
                onChange={ e => setCredentials({...credentials, lastName: e.target.value}) }
                value={ credentials.lastName }
                placeholder='* Last Name'
                required
                className='row' 
                aria-invalid= { validSName ? 'false' : 'true' }
                aria-describedby='snamenote'
                onFocus={() => setUserNameFocus(true)}
                onBlur={() => setUserNameFocus(false)}

                iconContent={<FontAwesomeIcon icon={faInfoCircle} />}
                iconClassName={userNameFocus && credentials.lastName && !validSName ? 'instructions' : 'offscreen'}
                errorMessage={USER_ERROR_MESSAGE}
                errorId='snamenote'
              />
              
              <ItemBlock 
                type = { passwordVisibility ? 'text' : 'password' }
                onChange={ e => setCredentials({...credentials, password: e.target.value}) }
                value={ credentials.password }
                placeholder = '* Password'
                required
                className = 'row'
                aria-invalid= { validPwd ? 'false' : 'true' }
                aria-describedby='pwdnote'
                onFocus={ () => setPwdFocus(true) }
                onBlur={ () => setPwdFocus(false) }
                onIconClick = { togglePasswordVisibility }
                icon = { eye }
                
                iconContent={<FontAwesomeIcon icon={faInfoCircle} />}
                iconClassName={ pwdFocus && !validPwd ? 'instructions' : 'offscreen' }
                errorMessage={PWD_ERROR_MESSAGE}
                errorId='pwdnote'
              />

              <Button type='submit' disabled={ !validEmail || !validName || !validSName || !validPwd ? true : false }>Sign up</Button>

              <div>
                <p>Already have an account?<Link to='/login'> Log In </Link></p>
              </div>
            </Form>
          </div>
        )
      }
      </>
    </Container>
  )
}

export default SignUp;
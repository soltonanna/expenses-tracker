import React, { useRef, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import Container from '../../components/Container';

/** Utils */
import { LoginPageBg } from '../../utils/media-files';
import { 
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

/** Use data from context */
import AuthContext from '../../context/AuthContext';

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [credentials, setCredentials] = useState({ password: '', username: '' });

  /** For REGEX */
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  
  /** Icons visibility */
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  
  /** Set the user input on focus after component load */
  useEffect(()=> {
    userRef.current.focus();
  }, []);

  /** Check userName & Password validation */
  useEffect(()=> {
    setValidName(EMAIL_REGEX.test(credentials.username));
  }, [credentials.username]);

  useEffect(()=> {
    setValidPwd(PWD_REGEX.test(credentials.password));
  }, [credentials.password]);

  useEffect(()=> {
    setErrMsg('');
  }, [credentials.username, credentials.password]);

  /** Password's icon visibility */
  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };
  const eye = <FontAwesomeIcon icon = { passwordVisibility ? faEyeSlash : faEye } />;

  /** Use Context data */
  const { loginCurrentUser } = useContext(AuthContext);
  
  /** States of form content */
  const submitHandler = (e) => {
    e.preventDefault();

    if (!EMAIL_REGEX.test(credentials.username) || !PWD_REGEX.test(credentials.password)) {
      setErrMsg(SUBMIT_ERROR_MESSAGE);
      return;
    }

    loginCurrentUser(credentials);
  }

  return (
    <Container className='login-page'>

      <div className='login-page__back-image'>
        <img src={ LoginPageBg } alt='Login Page' />
      </div>

      <>
        <div className='login-page__form'>
                <h2>Login</h2>
                <p>Sign in to your account to continue.</p>

                <p ref={errRef} className={ errMsg ? 'error-message' : 'offscreen'} aria-live='assertive'> 
                  { errMsg } 
                </p>
                
                <Form onSubmit = { submitHandler }>
                  <ItemBlock
                    type='email'
                    ref={userRef}
                    autoComplete='off'
                    onChange = { e => setCredentials({...credentials, username: e.target.value}) }
                    value= { credentials.username }
                    placeholder='* E-Mail'
                    name='username'
                    required
                    className='row' 
                    aria-invalid= { validName ? 'false' : 'true' }
                    aria-describedby='uidnote'
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}

                    iconContent={<FontAwesomeIcon icon={faInfoCircle} />}
                    iconClassName={userFocus && credentials.username && !validName ? 'instructions' : 'offscreen'}
                    errorMessage={EMAIL_ERROR_MESSAGE}
                    errorId='uidnote'
                  />

                  <ItemBlock 
                    type = { passwordVisibility ? 'text' : 'password' }
                    onChange = { e => setCredentials({...credentials, password: e.target.value}) }
                    value = { credentials.password }
                    placeholder = '* Password'
                    name = 'password'
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

                  <div>
                    <Link to='/forgot-password'> Forgot your password? </Link>
                    <p>Not registered? <Link to='/signup'> Create account </Link></p>
                  </div>

                  <Button type='submit' disabled={ !validName || !validPwd ? true : false }>Login</Button>
                </Form>
        </div>
      </>
    </Container>
  )
}

export default Login;
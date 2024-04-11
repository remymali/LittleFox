import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/formContainer.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation, useForgetMutation ,useGoogleLoginMutation} from '../slices/authApiSlice.js';
import { setCredentials } from '../slices/authSlice.js';
import { GoogleLogin } from '@react-oauth/google';
import Loader from '../components/Loader.jsx';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login] = useLoginMutation();
  const [forget] = useForgetMutation();
  const [googleLogin]=useGoogleLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    navigate('/login');
  }, []);

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!isValidEmail(email)) {
      errors.email = 'Invalid email';
      isValid = false;
    }

    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    }
    else if (!isValidPassword(password)) {
      errors.password = 'Password is should be 4 digit';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const isValidEmail = (email) => {
    // Regular expression to validate email address
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const isValidPassword = (password) => {

    return (password.length <5)
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    //Reset errors
    setErrors({});

    // Validate email
    if (!isValidEmail(email)) {
      setErrors({ email: 'Invalid email' });
      return;
    }

    // Call forgotPassword mutation
    try {
      const res = await forget({ email }).unwrap();
      console.log('resuser>>', res.key);
      const key = res.key;
      
      // Check response and handle accordingly
      if (res.message === 'OTP sent successfully') {
        console.log('OTP sent successfully');
        navigate('/OtpVerification', { state: { email, key } });
      } 
      
      else {
        // Handle other response messages if needed
        console.error('Forgot password failed:', res.message);
        toast.error('Forgot password failed: ' + res.message);
      }
    } catch (error) {
      // Handle mutation call errors
      console.error('Forgot password error:', error);
      toast.error('Forgot password error: ' + error.message);
    }
  };

const handleGoogleLogin = async (credentialResponse) => {
  try {
    const decoded = jwtDecode(credentialResponse?.credential);
    const userId = decoded.sub;
    const name = decoded.name;
    const email = decoded.email;
    console.log('decoded', decoded);

    // Call your API function for Google login
    const res = await googleLogin({email, name}).unwrap()
    
    console.log("res", res);
    if(res.message==='Success')
    {
    dispatch(setCredentials({...res.userDtls}))
    navigate('/userLandingPage');
    }
    // else if(res.message=== 'User is blocked')
    // {
    //   toast.error('User is blocked');
    // }
    // else
    // {
    //   toast.error('Invalid User');
    // }
  } catch (error) {
    console.error('Error during Google login:', error);
    // Handle error if needed
  }
};
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Step 1: Verify Password and Send OTP
      const res = await login({ email, password }).unwrap();
      console.log('res>>', res);
      dispatch(setCredentials({ ...res }));
      toast.success(`OTP number: ${res.OTP}`);

      if (res.message === 'OTP sent successfully') {
        console.log('OTP sent successfully');
        navigate('/OtpVerification', { state: { email } });
      }
      
    } catch (error) {
      console.error('Login error:', error);
      if (error.status === 401 && error.data.message === 'User is blocked') {
        console.log('User is blocked');
        toast.error('User is blocked');
      }
      if (error.status === 401 && error.data.message === 'Invalid email or password') {
        console.log('Invalid email or password');
        toast.error('Invalid email or password');
      }
      if (error.status === 500 && error.data.message === 'User not registered') {
        toast.error('User not registered')
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
      <FormContainer>
        <h1 className='text-center'>Login</h1>

        <Form onSubmit={handleLogin}>
          <Form.Group className='my-5' controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: !isValidEmail(e.target.value) ? 'Invalid email' : '' });
              }}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='my-5' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: !isValidPassword(e.target.value) ? 'Invalid password' : '' });
              }}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button disabled={isLoading} type='submit' className='ms-auto btn btn-primary btn-sm'>
                Send OTP
              </Button>
              <Link className='forgot-password-link' onClick={handleForgotPassword}style={{ marginLeft:'25px',fontSize:'10px',color: '#ffffff'
 }}>
                Forgot Password?
              </Link>
              {/* <Button disabled={isLoading} type='submit' className='mt-3 btn btn-primary btn-sm'>
    Forget Password
  </Button> */}
            </div>


            <hr style={{ width: '100%', margin: '10px 0' }} />
            <div  style={{ padding: '0' }}>
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                  console.log('Login Failed');
                }}

              />

            </div>


          </div>


        </Form>
        {isLoading && <Loader />}
      </FormContainer>
 
  );
};
  


export default UserLogin;

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/formContainer.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/authApiSlice.js';
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
    else if(!isValidPassword(password))
    {
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
  const isValidPassword =(password)=>{
   
    return  (password.length === 4)
  }

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='p-5' style={{minHeight: '100vh', backgroundColor: 'rgba(56, 46, 126, 0.8)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 0 20px rgba(0, 0, 0, 0.3)', borderRadius: '10px' }}>
      <FormContainer>
        <h1 className='text-center'>Login</h1>

        <Form onSubmit={handleLogin}>
          <Form.Group className='my-2' controlId='email'>
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

          <Form.Group className='my-2' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: !isValidPassword( e.target.value) ? 'Invalid password' : '' });
              }}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button disabled={isLoading} type='submit' className='mt-2 btn btn-primary btn-sm'>
              Send OTP
            </Button>
            <hr style={{ width: '100%', margin: '10px 0' }} />
            <div>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  const decoded = jwtDecode(credentialResponse?.credential);
                  const userId = decoded.sub;
                  const userName = decoded.name;
                  const userEmail = decoded.email;
                  console.log('decoded', decoded);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </div>
          </div>
        </Form>
        {isLoading && <Loader />}
      </FormContainer>
    </div>
  );
};

export default UserLogin;

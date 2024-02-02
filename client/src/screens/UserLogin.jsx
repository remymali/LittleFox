import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/formContainer.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation} from '../slices/authApiSlice.js';
import { setCredentials } from '../slices/authSlice.js';
import Loader from '../components/Loader.jsx'
import { toast } from 'react-toastify';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    navigate('/login')
  },[]);

 
  //code added
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Verify Password and Send OTP
      const res = await login({ email, password}).unwrap();
      console.log("res>>",res)
      dispatch(setCredentials({ ...res }));
      if (res.message === 'OTP sent successfully') {
        console.log('OTP sent successfully');
        navigate('/OtpVerification', { state: { email } });
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  return (
    <div>
     
         {/* Email and Password Input */}
        <FormContainer>
      <h1>Login</h1>

      <Form onSubmit={handleLogin}>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          disabled={isLoading}
          type='submit'
          variant='primary'
          className='mt-3'
        >
         Send OTP
        </Button>
      </Form>

      {  isLoading && <Loader />}

      {/* <Row className='py-3'>
        <Col>
          New Customer? <Link to='/register'>Register</Link>
        </Col>
      </Row> */}
    </FormContainer>
      
    </div>
  
  );
};

export default UserLogin;
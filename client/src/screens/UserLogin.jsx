import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/formContainer.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation, useVerifyOTPMutation } from '../slices/usersApiSlice.js';
import { setCredentials } from '../slices/authSlice.js';
import Loader from '../components/Loader.jsx'
import { toast } from 'react-toastify';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const [verifyOTP,{isLoadings}]=useVerifyOTPMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(step)
    navigate('/login')
  },[userInfo,[step]]);

 
  const handleVerifyOTP = async () => {
    try {
      // Step 2: Verify OTP
      const res = await verifyOTP({ email, otp}).unwrap();
      if (response.data.message === 'OTP verification successful') {

        // Redirect to the landing page or perform any necessary actions
        console.log('OTP verification successful');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
    }
  };
  //code added
  const handleLogin = async () => {
    try {
      // Step 1: Verify Password and Send OTP
      const res = await login({ email, password}).unwrap();
      console.log("res>>",res.role)
      dispatch(setCredentials({ ...res }));
      if (res.message === 'OTP sent successfully') {
        console.log('OTP sent successfully');
        setStep(2); // Move to Step 2 for OTP input
        console.log("step>>",step)
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  return (
    <div>
      {step === 1 ? (
        // Step 1: Email and Password Input
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
      ) : (
        // Step 2: OTP Input
        <FormContainer>
      <h1>Enter OTP:</h1>

      <Form onSubmit={handleVerifyOTP}>
        <Form.Group className='my-2' controlId='password'>
          <Form.Label>OTP</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter OTP'
            value={otp}
            onChange={(e) =>setOtp(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          disabled={isLoadings}
          type='submit'
          variant='primary'
          className='mt-3'
        >
          Verify OTP
        </Button>
      </Form>

      {  isLoadings && <Loader />}

      {/* <Row className='py-3'>
        <Col>
          resend OTP? <Link to='/register'>Register</Link>
        </Col>
      </Row> */}
    </FormContainer>
      )}
    </div>
  
  );
};

export default UserLogin;
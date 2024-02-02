import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/formContainer.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useVerifyOTPMutation } from '../slices/authApiSlice.js';
import { setCredentials } from '../slices/authSlice.js';
import Loader from '../components/Loader.jsx';
import { useNavigate, useLocation } from 'react-router-dom';

const OtpVerification = () => {
  const { state } = useLocation();
  const email = state?.email || '';

  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
  }, []);

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      // Verify OTP   
      const res = await verifyOTP({ email: email, otp }).unwrap();
      console.log('Verification response:', res);

      if (res.message === 'OTP verification successful') {
        dispatch(setCredentials({ ...res }));
        navigate('/userLandingPage');
        console.log('OTP verification successful. Redirecting to the landing page.');
      } else {
        console.error('OTP verification failed:', res.message);
        // Handle other cases if needed
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      // Handle the error appropriately
    }
  };

  return (
    <div>
      <FormContainer>
        <h1>Enter OTP:</h1>

        <Form onSubmit={handleVerifyOTP}>
          <Form.Group className='my-2' controlId='password'>
            <Form.Label>OTP</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter OTP'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </Form.Group>

          <Button
            disabled={isLoading}
            type='submit'
            variant='primary'
            className='mt-3'
          >
            Verify OTP
          </Button>
        </Form>

        {isLoading && <Loader />}

        {/* Additional UI elements if needed */}
      </FormContainer>
    </div>
  );
};

export default OtpVerification;

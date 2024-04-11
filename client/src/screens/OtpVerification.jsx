import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import FormContainer from '../components/formContainer.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useVerifyOTPMutation } from '../slices/authApiSlice.js';
import { setCredentials } from '../slices/authSlice.js';
import Loader from '../components/Loader.jsx';
import { useNavigate, useLocation} from 'react-router-dom';


const OtpVerification = () => {
  const { state } = useLocation();
  const email = state?.email || '';
  const password = state?.password || '';
  const key = state?.key  || '';

  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpTimer, setOtpTimer] = useState(60);
  const [isTimerVisible,setIsTimerVisible]=useState(true)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const timer = setInterval(() => {

      setOtpTimer(prevTimer => {
        if(prevTimer===0){
          clearInterval(timer)
          setIsTimerVisible(false)
        };        
       
        return prevTimer > 0 ? prevTimer - 1 : 0;
      });
    }, 1000);

    // Clear the timer when unmounting
   
    return () => clearInterval(timer);
    
   
  }, []);




  const handleResendOTP = async (e) => {
    e.preventDefault();
    try {
      // Trigger resend OTP functionality
      
      console.log('Resending OTP...');
    } catch (error) {
      console.error('Error resending OTP:', error);
      // Handle error if needed
    }
  };
  


  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    
    // OTP validation
    if (!otp.trim()) {
      setOtpError('OTP is required');
      return;
    }

    try {
      // Verify OTP   
      const res = await verifyOTP({ email: email, otp }).unwrap();
      console.log('Verification response:', res);
      console.log("key",key)
      if(key==='forgotpassword')
      {
        navigate('/regeneratePassword',{state:{email}});
      }
      else {

        dispatch(setCredentials({ ...res }));
        navigate('/userLandingPage');
        console.log('OTP verification successful. Redirecting to the landing page.');
      }
      //  else {
      //   console.error('OTP verification failed:', res.message);
      //   setOtpError('OTP entered is not correct');
      // }
    } catch (error) {
      console.error('OTP verification error:', error);
      setOtpError('OTP entered is not correct');
    }
  };

  return (
    
    <Container className="d-flex flex-column align-items-center justify-content-center "> 
    <FormContainer className="w-50"> 
      <h1>Enter OTP:</h1>
        {isTimerVisible &&
        <p className='otpTimer p-5'>OTP Timer: {otpTimer} seconds</p>
        }
        <Form onSubmit={handleVerifyOTP}>
          <Form.Group className='my-2' controlId='password'>
            <Form.Control
              type='text'
              placeholder='Enter OTP'
              value={otp}
              onChange={(e) =>{ setOtp(e.target.value)
                setOtpError('');
              }}
              isInvalid={!!otpError}
            />
            <Form.Control.Feedback type='invalid'>
              {otpError}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            disabled={isLoading || otpTimer === 0}
            type='submit'
            variant='primary'
            className='mt-3'
          >
            Verify OTP
          </Button>
          {!isTimerVisible &&
            <Button            
            variant='secondary'
            className='m-5 p-2'
            onClick={ handleResendOTP}
          >
            Resend OTP
          </Button>
          }
        </Form>

        {isLoading && <Loader />}

        {/* Additional UI elements if needed */}
      </FormContainer>
      </Container>
    
  );
};

export default OtpVerification;

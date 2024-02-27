
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import FormContainer from '../components/formContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useResetPasswordMutation } from '../slices/authApiSlice';
import Loader from '../components/Loader';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { useNavigate ,useLocation} from 'react-router-dom';

const PasswordResetPage = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = state?.email || '';
  const [resetPassword,{isloading}]=useResetPasswordMutation();
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')
  const [errors,setErrors]=useState('')
  const [isLoading,setIsLoading]=useState()

  console.log("userin", email);
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrors('Passwords do not match');
      return;
    }
    
      const res = await resetPassword({ password, email: email }).unwrap();
      dispatch(setCredentials({ ...res }));
      if (res.message === 'Password Reset Successfully') {
        toast.success('Reset Password Successfully');
        navigate('/login')
      }
   
  };

  return (
    <div className='p-5' style={{minHeight: '100vh',backgroundColor:'gray',  borderRadius: '10px' }}>
    <FormContainer>
              <h2 style={{ textAlign: 'center' }}>Password Reset</h2>
              <Form>
                <Form.Group>
                  <Form.Label >New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}                    
                    style={{ borderColor: '#333', borderWidth: '2px' }}                      
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label >Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ borderColor: '#333', borderWidth: '2px' }}
                  />
                </Form.Group>
                {errors && <Alert variant="danger">{errors}</Alert>}
                <Button variant="primary"
                  className='mt-4'
                  style={{ backgroundColor: 'lightblue', color: 'black' }}
                  onClick={handleResetPassword}>
                  Reset Password
                </Button>                
              </Form>
              {isLoading && <Loader />}
              </FormContainer>
            </div>
        
  );
};

export default PasswordResetPage;
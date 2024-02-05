import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateTeacherMutation } from '../../slices/adminApiSlice.js';
import { setCredentials } from '../../slices/authSlice.js';
import Loader from '../../components/Loader.jsx';
import { toast } from 'react-toastify';
import FormContainer from '../../components/formContainer.jsx';
import './Admin_Student.jsx'

const Admin_TeachRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const [createTeacher, { isLoading }] = useCreateTeacherMutation();

  useEffect(() => {
    if (userInfo) {
      // Redirect to a different route or handle authentication differently
      navigate('/teachRegister');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    // Client-side form validation
    if (!name || !email || !password ) {
      toast.error('All fields are required.');
      return;
    }

    try {
      const res = await createTeacher({ name, email, password }).unwrap();
      //dispatch(setCredentials({ ...res }));
      // Redirect to a different route after successful registration
      navigate('/teacher');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Student Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>


        {isLoading && <Loader />}

        <Button type='submit' variant='primary' className='mt-3'>
          Register
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Admin_TeachRegister;

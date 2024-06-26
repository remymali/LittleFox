import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAddNoticeMutation } from '../../../slices/noticeApiSlice.js';
import FormContainer from '../../../components/formContainer.jsx';
import Loader from '../../../components/Loader.jsx';
import { toast } from 'react-toastify';
import { generateToken, messaging } from '../../../Notification/firebase.js';
import { onMessage } from 'firebase/messaging';
import styled from 'styled-components'; // Import styled-components

const StyledContainer = styled(Container)`
  background-color: #f0f0f0; /* Set your desired background color */
  padding: 20px;
  border-radius: 10px;
  color:white;
`;

const AddNotice = () => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const [pushToken, setPushToken] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    generateToken();
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
    });
  }, [navigate]);

  const [addNotice, { isLoading }] = useAddNoticeMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Submitting form...");
    // Client-side form validation
    if (!title || !details || !date) {
      toast.error('All fields are required.');
      return;
    }
    try {
      const noticedtl = { title: title, details: details, date: date, sender: userInfo };
      const res = await addNotice(noticedtl).unwrap(); // Remove unwrap() here
      console.log("res", res ); // Access the payload directly
      navigate('/admin/listNotice');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <StyledContainer>
      <h1>Add Notice</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='details'>
          <Form.Label>Details</Form.Label>
          <Form.Control
            type='details'
            placeholder='Enter details'
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='date'>
          <Form.Label>Date</Form.Label>
          <Form.Control
            type='date'
            placeholder='Enter date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>

        {isLoading && <Loader />} 

        <Button type='submit' variant='primary' className='mt-3'>
          Save
        </Button>
      </Form>
    </StyledContainer>
  );
}

export default AddNotice;

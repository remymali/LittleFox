import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import FormContainer from '../../components/formContainer';

const TeacherVideoChat = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleJoinRoom = useCallback((e) => {
    e.preventDefault(); // Prevent default form submission behavior
    navigate(`/chatRoom/${value}`);
  }, [navigate, value]);

  return (
    <FormContainer>
      <Form onSubmit={handleJoinRoom}>
        <div className="form-outline" data-mdb-input-init>
          <input
            type='text'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder='Enter Room Code'
            className='form-control'
            style={{
              background: 'white',
              border: 'none',
              borderBottom: '1px solid #000000'
            }}
          />
          <br />
          <button type='submit' className='btn btn-secondary p-1'>Join</button>
        </div>
      </Form>
    </FormContainer>
  );
}

export default TeacherVideoChat;

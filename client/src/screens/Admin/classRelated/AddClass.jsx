import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAddClassMutation} from '../../../slices/classApiSlice.js';
import { useGetTeachersQuery } from '../../../slices/adminApiSlice.js';
import { setCredentials } from '../../../slices/authSlice.js';
import Loader from '../../../components/Loader.jsx';
import { toast } from 'react-toastify';
import FormContainer from '../../../components/formContainer.jsx';
import '../Admin_Student.jsx'

const AddClass = () => {
  const [name, setName] = useState('');
  const [division, setDivision] = useState('');
  const [teacher, setTeacher] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const {data:teachers,isLoading:teachersLoading} =useGetTeachersQuery();
  const [addClass, { isLoading }] = useAddClassMutation();
  useEffect(()=>{
    const fetchTeachers=(()=>{

    })
  })
  useEffect(() => {
    if (userInfo) {
      // Redirect to a different route or handle authentication differently
      navigate('/addClass');
    }
  }, [navigate, userInfo]);

  
  const submitHandler = async (e) => {
    e.preventDefault();
    
    // Client-side form validation
    if (!name || !division || !teacher) {
      toast.error('All fields are required.');
      return;
    }

    try {
        console.log("teacher",teacher)
        const classdtl={name:name,division:division,teacher:teacher}
      const res = await addClass(classdtl).unwrap();
      navigate('/class');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Add Class</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='division'>
          <Form.Label>Division</Form.Label>
          <Form.Control
            type='division'
            placeholder='Enter division'
            value={division}
            onChange={(e) => setDivision(e.target.value)}
          />
        </Form.Group>

        
        <Form.Group className="mb-3">
        <Form.Label>Class Teacher</Form.Label>
        <Form.Select  value={teacher}  onChange={(e)=>setTeacher(e.target.value)}>
          <option value=" ">Select a teacher</option>
          {
            teachersLoading?(<option disabled>Teachers loading...</option>):

            (teachers.map((teacher)=><option key={teachers._id} value={teacher._id}>{teacher.name}</option>))
          }
        </Form.Select >
      </Form.Group>

        {isLoading && <Loader />}

        <Button type='submit' variant='primary' className='mt-3'>
          Save
        </Button>
      </Form>
    </FormContainer>
  );
};

export default AddClass;

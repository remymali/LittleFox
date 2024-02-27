import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateUserMutation } from '../../../slices/adminApiSlice.js';
import { setCredentials } from '../../../slices/authSlice.js';
import { useGetClassQuery } from '../../../slices/classApiSlice.js';
import Loader from '../../../components/Loader.jsx';
import { toast } from 'react-toastify';
import FormContainer from '../../../components/formContainer.jsx';
import './Admin_Student.jsx'

const Admin_StudRegistration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sclass, setSclass]= useState('')
  const [file,setFile]=useState(null)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const [createUser, { isLoading }] = useCreateUserMutation();
  const {data:classes,isLoading:sclassLoading} = useGetClassQuery();
  console.log("classes",classes)
  useEffect(() => {
    if (userInfo) {
      // Redirect to a different route or handle authentication differently
      navigate('/studRegister');
    }
  }, [navigate, userInfo]);

  
  const submitHandler = async (e) => {
    e.preventDefault();
    
    // Client-side form validation
    if (!name || !email || !password || !file ||!sclass) {
      toast.error('All fields are required.');
      return;
    }

    try {
      console.log("selectedFile",file);
      const formData=new FormData()
      formData.append('name',name);
      formData.append('email',email);
      formData.append('password',password);
      formData.append('file',file);
      formData.append('sclass',sclass);
      console.log("formData",formData)
      const res = await createUser(formData).unwrap();
      //dispatch(setCredentials({ ...res }));
      // Redirect to a different route after successful registration
      navigate('/student');
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

        <Form.Group className="mb-3">
        <Form.Label>Class</Form.Label>
        <Form.Select  value={sclass}  onChange={(e)=>setSclass(e.target.value)}>
          <option value=" ">Select Class</option>
          {
            sclassLoading?(<option disabled>Class loading...</option>):

            (classes.map((element)=><option key={classes._id} value={element._id}>{element.name+"-"+element.division}</option>))
          }
        </Form.Select >
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
        <Form.Group controlId='file'>
          <Form.Label>Upload Image</Form.Label>
          <Form.Control   
            type='file'
            onChange={(e)=>setFile(e.target.files[0])} // Handle file selection
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

export default Admin_StudRegistration;

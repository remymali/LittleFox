import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect } from 'react';
import { generateToken,messaging } from './Notification/firebase';
import { onMessage } from 'firebase/messaging';

const App = () => {
   useEffect(()=>{
    generateToken();
    
   },[])
  return (
    <>
      <Header />
      <ToastContainer />
      <Container className='my-2 mt-2'>
        <Outlet />
      </Container>
    </>
  );
};

export default App;
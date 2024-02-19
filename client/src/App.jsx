import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';


const App = () => {
  
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
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import UserHeader from './components/UserHeader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <UserHeader />
      <ToastContainer />
      <Container className='my-2 mt-2'>
        <Outlet />
      </Container>
    </>
  );
};

export default App;
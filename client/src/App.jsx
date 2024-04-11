import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect } from 'react';
import { generateToken, messaging } from './Notification/firebase';
import { onMessage } from 'firebase/messaging';
import styled from 'styled-components';

const App = () => {
  // Generate push notification token on component mount
  useEffect(() => {
    generateToken();
  }, []);

  return (
    <>
      <Header />
      <ToastContainer />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Ensure full viewport height */
  width: 100vw; /* Take full width of the parent container */
`;

export default App;

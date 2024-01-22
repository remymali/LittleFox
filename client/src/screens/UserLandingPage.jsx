import { Container, Card, Button } from 'react-bootstrap';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'

const useLandingPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
  }, []); // Empty dependency array means it runs once when the component mounts

  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
        <img
      src='/images/LittleFox.jpg'  // Add .default here
      style={{width:150 ,height:100}}
    />
           <h4 className='text-center mb-4'>LITTLE-FOX KINDERGARTEN</h4>
          <h1 className='text-center mb-4'>
            Welcome {userInfo.name} 
          </h1>
         
          
          
        </Card>
      </Container>
    </div>
  );
};

export default useLandingPage;

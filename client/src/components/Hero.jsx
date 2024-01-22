import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
const Hero = () => {
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
        <img
      src='/images/LittleFox.jpg'  // Add .default here
      style={{width:150 ,height:100}}
    />
          
          <h1 className='text-center mb-4'>LITTLE-FOX KINDERGARTEN</h1>
          <p className='text-center mb-4'>
            Welcome to Little-Fox kindergarten
          </p>
          {/* <div className='d-flex'>
            <LinkContainer to='/login'>
            <Button variant='primary' className='me-3'>
              Sign In
            </Button>
            </LinkContainer>
            
            <LinkContainer to='/register'>
            <Button variant='secondary'>
              Sign Up
            </Button>
            </LinkContainer>
            
          </div> */}
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
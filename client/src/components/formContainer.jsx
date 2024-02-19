import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className='justify-content-md-center mt-5'>
        <Col xs={12} md={6} className='card p-5' style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;

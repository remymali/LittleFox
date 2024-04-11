import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <MainContainer>
      {children}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 90vh;
  width: 80vw; /* Adjust width for smaller screens */
  max-width: 500px; /* Limit maximum width for larger screens */
  padding: 20px;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;

  @media screen and (max-width: 768px) {
    width: 90vw; /* Adjust width for smaller screens */
  }
`;

export default FormContainer;

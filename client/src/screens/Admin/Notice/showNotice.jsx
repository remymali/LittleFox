import React, { useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NoticeTable from '../../../components/NoticeTable.jsx'

const ShowNotice = () => {
  const navigate = useNavigate();
 
  const handleNoticeAdding = () => {
    navigate('/notice');
  };


  return (
    <Container>
      <Row>
        <div className="d-flex justify-content-end p-2">
          <Button variant="primary" size="lg" className="ml-auto" onClick={handleNoticeAdding}>
            Add
          </Button>
        </div>
      </Row>
      <Row>
        <NoticeTable />        
      </Row>
      
    </Container>
  );
};

export default ShowNotice;

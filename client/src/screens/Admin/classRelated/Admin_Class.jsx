import React from 'react';
import ClassTable from '../../../components/ClassTable.jsx';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Admin_Class = () => {
  const navigate = useNavigate();

  const handleClassAdding = () => {
    navigate('/addClass');
  };

  return (
    <Container>
      <Row className="justify-content-end mb-3">
        <Col xs="auto">
          <Button variant="primary" size="lg" onClick={handleClassAdding}>
            Add
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="table-responsive">
            <ClassTable />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin_Class;

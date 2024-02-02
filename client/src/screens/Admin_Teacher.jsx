import React from 'react'
import TeachersTable from '../components/TeachersTable.jsx'
import { Button,Container,Row,Col } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'

const Admin_Teacher = () => {
  const navigate=useNavigate();
  const handleTeacherAdding=()=>{
    navigate('/teachRegister')
  }
  return (

    <Container>
      <Row>
      < div className="d-flex justify-content-end p-2">
          <Button variant="primary" size="lg" className="ml-auto" onClick={handleTeacherAdding}>
            Add
          </Button>
        </div>
        <Col>
          <TeachersTable />
        </Col>
        
      </Row>
    </Container>
  )
}

export default Admin_Teacher

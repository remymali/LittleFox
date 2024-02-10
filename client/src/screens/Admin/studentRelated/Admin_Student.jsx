import React from 'react'
import UsersTable from '../../../components/UserTable.jsx'
import { Button,Container,Row,Col } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
const Admin_Student = () => {
  const navigate=useNavigate();
  const handleStudentAdding=()=>{
    navigate('/studRegister')
  }
  return (

    <Container>
      <Row>
      < div className="d-flex justify-content-end p-2">
          <Button variant="primary" size="lg" className="ml-auto" onClick={handleStudentAdding}>
            Add
          </Button>
        </div>
        <Col>
          <UsersTable />
        </Col>
        
      </Row>
    </Container>
  )
}

export default Admin_Student

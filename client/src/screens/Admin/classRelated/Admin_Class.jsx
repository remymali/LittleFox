import React from 'react'
import ClassTable from '../../../components/ClassTable.jsx'
import { Button,Container,Row,Col } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
const Admin_Class = () => {
  const navigate=useNavigate();
  const handleClassAdding=()=>{
    navigate('/addClass')
  }
  return (

    <Container>
      <Row>
      < div className="d-flex justify-content-end p-2">
          <Button variant="primary" size="lg" className="ml-auto" onClick={handleClassAdding}>
            Add
          </Button>
        </div>
        <Col>
          <ClassTable />
        </Col>
        
      </Row>
    </Container>
  )
}

export default Admin_Class

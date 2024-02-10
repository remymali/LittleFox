import React from 'react'
import CommonTable from '../../../components/commonTable.jsx'
import { Button,Container,Row,Col } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
const Admin_Subject = () => {
  const navigate=useNavigate();
  const handleClassAdding=()=>{
    navigate('/addSubject')
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
          <CommonTable />
        </Col>
        
      </Row>
    </Container>
  )
}

export default Admin_Subject


import React, {useState,useEffect} from 'react'
import UsersTable from '../../../components/UserTable.jsx'
import { Button,Container,Row,Col } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import { useGetClassQuery } from '../../../slices/classApiSlice.js';
import './Admin_Student.css'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Admin_Student = () => {
  const [selectedClass, setSelectedClass] = useState('');
  /**pagination start */
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  /**pagination end */
  const navigate=useNavigate();
  const {data:classes,isLoading:sclassLoading} = useGetClassQuery({
    selectedClass,
    page: currentPage,
    limit: itemsPerPage,
  });
  useEffect(() => {
    if (!sclassLoading && classes) {
      
      setTotalPages(Math.ceil(classes.length / itemsPerPage));
    }
  }, [sclassLoading, classes, itemsPerPage]);
  const handleStudentAdding=()=>{
    navigate('/studRegister')
  }

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };
  return (

    <Container>
      <Row>
      
      <div className='custom-div'>  
      <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
      <option value=" ">Select Class</option>
          {
            sclassLoading?(<option disabled>Class loading...</option>):

            (classes.map((element)=><option key={classes._id} value={element._id}>{element.name+element.division}</option>))
          }
      </select>

     
    </div>
      < div className="d-flex justify-content-end p-2">
          <Button variant="primary" size="lg" className="ml-auto" onClick={handleStudentAdding}>
            Add
          </Button>
        </div>
        <Col>
          <UsersTable selectedClass={selectedClass} data={classes}/>
        </Col>
        <Stack spacing={2}>
        <Pagination
              color="primary"
              className='p-5'
              count={totalPages}
              page={currentPage}
              onChange={handleChangePage}
            />
        </Stack>
      </Row>
    </Container>
  )
}

export default Admin_Student

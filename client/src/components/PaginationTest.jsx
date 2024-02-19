import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationTest = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(1);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  

  return (
    <div >
      <Stack spacing={2}>
      <Pagination
              color="primary"
              className='p-5'
              count={rowsPerPage}
              page={page}
              onChange={handleChangePage}
            />
       
      </Stack>
    </div>
  );
};

export default PaginationTest;

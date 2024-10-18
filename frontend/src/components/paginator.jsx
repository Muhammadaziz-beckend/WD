import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationRounded = (
  {
    page,
    setPage,
    count,
    scrollToSection,
  }
) => {
  const handlePageChange = (event, value) => {
    setPage(value); // Устанавливаем новую активную страницу
  };


  console.log(
    {
      page,
      setPage,
      count
    }
  );


  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        page={page}
        onClick={scrollToSection}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
};

export default PaginationRounded;

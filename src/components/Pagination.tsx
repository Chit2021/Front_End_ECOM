import * as React from 'react';
import { Stack, Pagination as MuiPagination } from '@mui/material';

type PaginationType = {
  count: number;
  currentPage: number;
  setPage: (page: number) => void;
};

const Pagination: React.FC<PaginationType> = ({
  count,
  currentPage,
  setPage,
}) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Stack spacing={2} sx={{ margin: '2rem 0' }}>
      <MuiPagination
        count={count}
        page={currentPage}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
        size="large"
      />
    </Stack>
  );
};

export default Pagination;
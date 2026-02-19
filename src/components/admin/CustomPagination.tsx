"use client";

import { Pagination, PaginationProps } from "react-admin";

export const CustomPagination = (props: PaginationProps) => (
  <Pagination
    {...props}
    rowsPerPageOptions={[5, 10, 25, 50]}
  />
);


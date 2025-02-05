import { FC } from "react";
import PaginationSkeleton from "./skeletons/PaginationSkeleton";
import { Pagination as MUIPagination } from "@mui/material";

interface Props {
  isFetching: boolean;
  currentPage: number;
  setCurrentPage: (val: number) => void;
  count: number;
}

const Pagination: FC<Props> = ({
  isFetching,
  currentPage,
  setCurrentPage,
  count,
}) => {
  return (
    <>
      {isFetching}
      {isFetching ? (
        <PaginationSkeleton />
      ) : (
        <MUIPagination
          count={count}
          color="primary"
          page={currentPage + 1}
          onChange={(e, p) => setCurrentPage(p - 1)}
          showFirstButton
          showLastButton
        />
      )}
    </>
  );
};

export default Pagination;

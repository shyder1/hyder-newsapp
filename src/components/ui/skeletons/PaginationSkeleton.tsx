import { Skeleton, Stack } from "@mui/material";

const PaginationSkeleton = () => {
  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="center"
      alignItems="center"
    >
      <Skeleton variant="rounded" width={32} height={32} />

      {[...Array(5)].map((_, index) => (
        <Skeleton
          key={index}
          variant="rounded"
          width={32}
          height={32}
          animation={index === 2 ? "wave" : "pulse"}
        />
      ))}

      <Skeleton variant="rounded" width={32} height={32} />
    </Stack>
  );
};

export default PaginationSkeleton;

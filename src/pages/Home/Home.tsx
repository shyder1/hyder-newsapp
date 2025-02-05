import { useCallback, useEffect, useMemo, useState } from "react";
import apiService from "../../api/axios";
import {
  GuardianApiResponse,
  GuardianResponse,
} from "../../types/guardian-news.types";
import { AxiosResponse } from "axios";
import { ArticlesResponse, NewsSource } from "../../types/news.types";
// import { Pagination } from "flowbite-react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAllNews } from "../../api/query/query-functions/all-news";
import NewsGrid from "../../components/ui/NewsGrid";
import Filters from "../../components/Filters";
import NewsSkeletonGrid from "../../components/ui/skeletons/NewsGridSkeleton";
// import { NYTResponse } from "@/types/newyork-times-news.types";
import _ from "lodash";
import EditIcon from "@mui/icons-material/Edit";
import PreferenceForm from "../../components/PreferenceForm";
import CustomModal from "../../components/ui/Modal";
import { usePreferences } from "../../contexts/PreferencesContext";
import { NEWS_SOURCES } from "../../api/statis";
import PaginationSkeleton from "../../components/ui/skeletons/PaginationSkeleton";
import Pagination from "../../components/ui/Pagination";

const HomeView = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const [preferencesOpen, setPreferencesOpen] = useState(false);

  const { categories, newsSources } = usePreferences();

  const qString = useMemo(
    () => (categories?.length ? categories?.join(" OR ") : null),
    [categories]
  );

  const { data, isLoading, isFetching, isError, error } = useAllNews({
    page: currentPage,
    q: qString,
    sources: newsSources,
    // from_date: startDate,
    // to_date: endDate,
  });

  const handlePreferencesOpen = () => {
    setPreferencesOpen(true);
  };

  const handlePreferencesClose = () => {
    setPreferencesOpen(false);
  };

  return (
    <Box
      className="flex flex-col m-auto"
      sx={{ width: { xs: "100%", md: "94%" } }}
    >
      <Typography variant="h2">My Feed</Typography>
      <Box className="flex flex-row justify-end">
        <Button onClick={handlePreferencesOpen}>
          <EditIcon sx={{ fill: "primary.main", mr: 0.5 }} />
          My Preferences
        </Button>
      </Box>

      <div className="flex justify-end flex-row my-8">
        <Pagination
          isFetching={isFetching}
          count={Math.ceil(data?.totalResults / 30)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <Stack className="w-full mt-4">
        {isFetching ? (
          <NewsSkeletonGrid />
        ) : (
          <NewsGrid newsList={data?.articles} />
        )}
      </Stack>

      <div className="flex justify-end flex-row my-8">
        <Pagination
          isFetching={isFetching}
          count={Math.ceil(data?.totalResults / 30)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <CustomModal
        title="My Preferences"
        open={preferencesOpen}
        onClose={handlePreferencesClose}
      >
        <PreferenceForm onClose={handlePreferencesClose} />
      </CustomModal>
    </Box>
  );
};

export default HomeView;

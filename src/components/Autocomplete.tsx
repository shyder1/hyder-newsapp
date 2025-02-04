import { useCallback, useEffect, useState } from "react";
import apiService from "../api/axios";
import {
  GuardianApiResponse,
  GuardianResponse,
} from "../types/guardian-news.types";
import { AxiosResponse } from "axios";
import { ArticlesResponse } from "@/types/news.types";
// import { Pagination } from "flowbite-react";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";
import { Search, ClearAll, Cancel } from "@mui/icons-material";
import { useAllNews } from "../api/query/query-functions/all-news";
import NewsGrid from "./ui/NewsGrid";
import UserAvatar from "./ui/Avatar";
import DatePicker from "./ui/DatePicker";
import Filters from "./Filters";
import NewsCardSkeleton from "./ui/skeletons/NewsCardSkeleton";
import NewsSkeletonGrid from "./ui/skeletons/NewsGridSkeleton";
// import { NYTResponse } from "@/types/newyork-times-news.types";
import _ from "lodash";

const mockUser = {
  name: "John Doe",
  avatarUrl: "https://example.com/avatar.jpg",
};

const Autocomplete = () => {
  const [values, setValues] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [categoryValues, setCategoryValues] = useState<
    { value: string; label: string }[]
  >([]);
  const [sourceValues, setSourceValues] = useState<
    { value: string; label: string }[]
  >([]);

  const search = useCallback(
    _.debounce((phrase: string) => {
      setSearchPhrase(phrase);
    }, 1000),
    []
  );

  const { data, isLoading, isFetching, isError, error } = useAllNews({
    page: currentPage,
    q: searchPhrase,
    from_date: startDate,
    to_date: endDate,
  });

  useEffect(() => {
    console.log(
      "source value: ",
      sourceValues,
      "category values: ",
      categoryValues
    );
  }, [sourceValues, categoryValues]);

  useEffect(() => {
    search(searchField);
  }, [searchField]);

  return (
    <div className="flex flex-col w-[90%] m-auto">
      <Box className="flex flex-row">
        <Filters
          variant="filters"
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setSearch={setSearchField}
          categories={categoryValues}
          setCategories={setCategoryValues}
          sources={sourceValues}
          setSources={setSourceValues}
        />
      </Box>

      <div className="flex justify-start flex-row my-8">
        <Pagination
          count={Math.ceil(data?.totalResults / 10)}
          color="primary"
          page={currentPage + 1}
          onChange={(e, p) => setCurrentPage(p - 1)}
          showFirstButton
          showLastButton
        />
      </div>

      <Stack className="w-full mt-10">
        {isFetching ? (
          <NewsSkeletonGrid />
        ) : (
          <NewsGrid newsList={data?.articles} />
        )}
      </Stack>

      <div className="flex justify-start flex-row my-8">
        <Pagination
          count={Math.ceil(data?.totalResults / 10)}
          color="primary"
          page={currentPage + 1}
          onChange={(e, p) => setCurrentPage(p - 1)}
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  );
};

export default Autocomplete;

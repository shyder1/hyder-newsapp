import { useCallback, useMemo, useState } from "react";
import { NewsSourceOption } from "@/types/news.types";
// import { Pagination } from "flowbite-react";
import { Box, Stack, Typography } from "@mui/material";
import { useAllNews } from "../../api/query/query-functions/all-news";
import NewsGrid from "../../components/ui/NewsGrid";
import NewsSkeletonGrid from "../../components/ui/skeletons/NewsGridSkeleton";
import Pagination from "../../components/ui/Pagination";

import _ from "lodash";
import Search from "../../components/Search";
import FilterAction from "../../components/FiltersAction";

const SearchFilters = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [categoryValues, setCategoryValues] = useState<AutocompleteOption[]>(
    []
  );
  const [sourceValues, setSourceValues] = useState<NewsSourceOption[]>([]);

  const search = useCallback(
    _.debounce((phrase: string) => {
      setSearchPhrase(phrase);
    }, 1000),
    []
  );

  const getsearchQuery = useMemo(
    () =>
      _.debounce(
        (phrase, categories) =>
          `${phrase ? `${phrase} AND ` : ""}${categories?.join(" OR ")}`,
        1000
      ),
    [] // Empty dependency array since we want to create the debounced function once
  );

  const searchQuery = useMemo(
    () => getsearchQuery(searchPhrase, categoryValues),
    [searchPhrase, categoryValues]
  );

  const { data, isLoading, isFetching, isError, error } = useAllNews({
    page: currentPage,
    q: searchQuery,
    from_date: startDate,
    to_date: endDate,
    sources: sourceValues?.map((obj) => obj.value),
  });

  return (
    <div className="flex flex-col w-[94%] m-auto">
      <Typography variant="h2" mb={3}>
        Search & Filters
      </Typography>
      <Box
        className="flex"
        sx={{
          flexDirection: { xs: "column-reverse", md: "row" },
          justifyContent: { xs: "start", md: "space-between" },
          mt: { xs: 2, md: 0 },
        }}
      >
        <FilterAction
          variant="filters"
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          categories={categoryValues}
          setCategories={setCategoryValues}
          sources={sourceValues}
          setSources={setSourceValues}
        />
        <Search setSearch={search} />
      </Box>

      <div className="flex justify-start flex-row my-8">
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

      <div className="flex justify-start flex-row my-8">
        <Pagination
          isFetching={isFetching}
          count={Math.ceil(data?.totalResults / 30)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default SearchFilters;

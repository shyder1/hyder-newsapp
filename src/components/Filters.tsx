import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { NEWS_CATEGORIES, NEWS_SOURCES } from "../api/statis";
import AutocompleteMultiSelect from "./ui/AutoComplete";
import _ from "lodash";
import DateRangeInput from "./ui/DateRangeInput";
import { NewsSource, NewsSourceOption } from "../types/news.types";

export interface Props {
  variant: "preference" | "filters";
  setStartDate?: (value: string) => void;
  setEndDate?: (value: string) => void;
  setSearch?: (value: string) => void;
  categories?: AutocompleteOption[];
  setCategories?: (value: Array<AutocompleteOption>) => void;
  sources?: NewsSourceOption[];
  setSources?: (value: Array<NewsSourceOption>) => void;
}

const styles = {
  preference: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
  },
  filters: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
  },
};

const showFields = {
  preference: {
    date: false,
    categories: true,
    sources: true,
  },
  filters: {
    date: true,
    categories: true,
    sources: true,
  },
};

const Filters: FC<Props> = ({
  variant,
  setStartDate,
  setEndDate,
  setCategories,
  setSources,
  categories,
  sources,
}) => {
  const categoryOptions = [
    ...NEWS_CATEGORIES.map((obj) => ({
      value: obj,
      label: _.capitalize(obj),
    })),
  ];

  const newsSourcesOptions = Object.entries(NewsSource).map(([key, value]) => ({
    value: value,
    label: NEWS_SOURCES?.[value],
  }));

  return (
    <Stack className="w-full" sx={{ ...styles?.[variant] }} spacing={2} gap={2}>
      <Stack sx={{ ...styles?.[variant] }} spacing={1}>
        {showFields[variant].date ? (
          <Stack className="justify-start items-start">
            <Typography variant="subtitle2">Date</Typography>
            <DateRangeInput
              onDateChange={(a, b) => {
                setStartDate(a);
                setEndDate(b);
              }}
            />
          </Stack>
        ) : (
          <></>
        )}
        {showFields[variant].categories ? (
          <Stack className="justify-start items-start ml-4 mt-0">
            <Typography variant="subtitle2">Categories</Typography>
            <AutocompleteMultiSelect
              label="Categories"
              options={categoryOptions}
              value={categories}
              onChange={(values) => {
                const unique = _.uniqBy(values, "value");
                setCategories([...unique]);
              }}
              placeholder="Select Categories"
              customColors={{
                hoverBorder: "#ff4400",
                focusBorder: "#ff4400",
                chipBackground: "#ff4400",
                chipColor: "white",
              }}
              fullWidth
            />
          </Stack>
        ) : (
          <></>
        )}
        {showFields[variant].sources ? (
          <Stack className="justify-start items-start ml-4">
            <Typography variant="subtitle2">Sources</Typography>
            <AutocompleteMultiSelect
              label="News Source"
              options={newsSourcesOptions}
              value={sources}
              onChange={(values) => {
                const unique = _.uniqBy(values, "value");
                setSources([...unique]);
              }}
              placeholder="Select News Source"
              customColors={{
                hoverBorder: "#ff4400",
                focusBorder: "#ff4400",
                chipBackground: "#ff4400",
                chipColor: "white",
              }}
              fullWidth
            />
          </Stack>
        ) : (
          <></>
        )}
      </Stack>
    </Stack>
  );
};

export default Filters;

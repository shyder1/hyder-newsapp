import { Button, Stack } from "@mui/material";
import { FC, useState } from "react";

import Filters from "./Filters";
import { usePreferences } from "../contexts/PreferencesContext";
import { NEWS_SOURCES } from "../api/statis";
import _ from "lodash";
import { NewsSourceOption } from "../types/news.types";

interface Props {
  onClose: () => void;
}

const PreferenceForm: FC<Props> = ({ onClose }) => {
  const { categories, addCategories, newsSources, addNewsSources } =
    usePreferences();

  const categorySelected = [
    ...categories.map((obj) => ({
      value: obj,
      label: _.capitalize(obj),
    })),
  ];

  const newsSourcesSelected: NewsSourceOption[] = newsSources?.map((value) => ({
    value: value,
    label: NEWS_SOURCES[value],
  }));
  const [categoryValues, setCategoryValues] = useState<AutocompleteOption[]>([
    ...categorySelected,
  ]);
  const [sourceValues, setSourceValues] = useState<NewsSourceOption[]>([
    ...newsSourcesSelected,
  ]);

  const handleSave = () => {
    const categoriesValue = categoryValues.map((obj) => obj?.value);
    const sourcesValue = sourceValues.map((obj) => obj?.value);
    addCategories(categoriesValue);
    addNewsSources(sourcesValue);
    onClose();
  };

  return (
    <Stack className="w-full h-auto p-4 flex-col relative pb-14" spacing={2}>
      <Filters
        variant="preference"
        categories={categoryValues}
        setCategories={setCategoryValues}
        sources={sourceValues}
        setSources={setSourceValues}
      />
      <Button
        variant="contained"
        className="absolute bottom-0 mt-32"
        sx={{ position: "absolute", bottom: "8px", right: "16px" }}
        onClick={handleSave}
      >
        Save
      </Button>
    </Stack>
  );
};

export default PreferenceForm;

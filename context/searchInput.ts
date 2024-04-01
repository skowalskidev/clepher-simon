import { BestMatchResults } from "@/utils/apixxx";
import { createContext } from "react";

interface SearchInputContext {
    searchResults: BestMatchResults;
}

export const SearchInputContext = createContext<SearchInputContext>({ searchResults: null });
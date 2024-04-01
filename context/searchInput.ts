import { BestMatchResults } from "@/utils/api";
import { createContext } from "react";

interface SearchInputContext {
    searchResults: BestMatchResults;
}

export const SearchInputContext = createContext<SearchInputContext>({ searchResults: null });
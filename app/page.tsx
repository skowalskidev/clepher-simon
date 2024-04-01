'use client';

import { Alert } from "@/components/Alert";
import { Chart } from "@/components/Chart";
import { Header } from "@/components/Header";
import { SeachInput } from "@/components/SearchInput";
import { TopGainersLosers } from "@/components/TopGainersLosers";
import { BestMatchResults, fetchApiData, fetchApiSearchResults, fetchApiTopGainersLosers, fetchDemolData } from "@/utils/Api";
import { createContext, useEffect, useState } from "react";

interface SearchInputContext {
  searchResults: BestMatchResults;
}
export const SearchInputContext = createContext<SearchInputContext>({ searchResults: null });

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<any>(null);
  const [topGainersLosers, setTopGainersLosers] = useState<any>(null);
  const [errorMessageForClient, setErrorMessageForClient] = useState<string | null>(null);

  useEffect(() => {
    fetchApiTopGainersLosers()
      .then(setTopGainersLosers)
      .catch(setErrorMessageForClient);
    fetchDemolData()
      .then(setData)
      .catch(setErrorMessageForClient);
  }, []);

  function onSubmit(symbol: string) {
    setData(null);
    setSearchResults(null);
    fetchApiData(symbol)
      .then(setData)
      .catch(setErrorMessageForClient);
  }

  function onSearchInput(keywords: string) {
    if (!keywords.length) {
      setSearchResults(null);
      return;
    };
    fetchApiSearchResults(keywords)
      .then(setSearchResults)
      .catch(setErrorMessageForClient);
  }

  function onBlur() {
    setSearchResults(null);
  }

  return (<>
    <Header>
      <SearchInputContext.Provider value={{ searchResults }}>
        <SeachInput onSubmit={onSubmit} onInput={onSearchInput} onBlur={onBlur} searchResults={searchResults} />
      </SearchInputContext.Provider>
    </Header>
    <main>
      {errorMessageForClient
        ? <Alert message={errorMessageForClient.toString()} />
        : <div className="flex flex-col sm:flex-row">
          <TopGainersLosers topGainersLosersData={topGainersLosers} />
          <div className="py-2 px-2 mx-auto w-full flex items-center">
            <div className="flex flex-col w-full">
              <Chart data={data} />
            </div>
          </div>
        </div>}
    </main>
  </>
  );
}

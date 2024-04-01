'use client';

import { Alert } from "@/components/Alert";
import { Chart } from "@/components/Chart";
import { Header } from "@/components/Header";
import { SeachInput } from "@/components/SearchInput";
import { TopGainersLosers } from "@/components/TopGainersLosers";
import { SearchInputContext } from "@/context/searchInput";
import { fetchApiData, fetchApiSearchResults, fetchApiTopGainersLosers, fetchDemolData } from "@/utils/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [chartData, setChartData] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<any>(null);
  const [topGainersLosers, setTopGainersLosers] = useState<any>(null);
  const [errorMessageForClient, setErrorMessageForClient] = useState<string | null>(null);

  useEffect(() => {
    fetchApiTopGainersLosers()
      .then(setTopGainersLosers)
      .catch(setErrorMessageForClient);
    fetchDemolData()
      .then(setChartData)
      .catch(setErrorMessageForClient);
  }, []);

  function onSearchSubmit(symbol: string) {
    setChartData(null);
    setSearchResults(null);
    fetchApiData(symbol)
      .then(setChartData)
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

  function onSearchBlur() {
    setSearchResults(null);
  }

  return (
    <>
      <Header>
        <SearchInputContext.Provider value={{ searchResults }}>
          <SeachInput onSubmit={onSearchSubmit} onInput={onSearchInput} onBlur={onSearchBlur} />
        </SearchInputContext.Provider>
      </Header>
      <main>
        {errorMessageForClient
          ? <Alert message={errorMessageForClient.toString()} />
          : <div className="flex flex-col-reverse sm:flex-row">
            <TopGainersLosers topGainersLosersData={topGainersLosers} />
            <Chart data={chartData} />
          </div>}
      </main>
    </>
  );
}

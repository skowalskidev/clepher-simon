'use client';

import { Alert } from "@/components/Alert";
import { Chart } from "@/components/Chart";
import { Header } from "@/components/Header";
import { SeachInput } from "@/components/SearchInput";
import { TopGainersLosers } from "@/components/TopGainersLosers";
import { fetchApiData, fetchApiSearchResults, fetchApiTopGainersLosers, fetchDemolData } from "@/utils/Api";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, SetData] = useState<any>(null);
  const [searchResults, SetSearchResults] = useState<any>(null);
  const [topGainersLosers, SetTopGainersLosers] = useState<any>(null);
  const [errorMessageForClient, SetErrorMessageForClient] = useState<string | null>(null);

  useEffect(() => {
    fetchApiTopGainersLosers()
      .then(SetTopGainersLosers)
      .catch(SetErrorMessageForClient);
    fetchDemolData()
      .then(SetData)
      .catch(SetErrorMessageForClient);
  }, []);

  function onSubmit(symbol: string) {
    SetData(null);
    SetSearchResults(null);
    fetchApiData(symbol)
      .then(SetData)
      .catch(SetErrorMessageForClient);
  }

  function onSearchInput(keywords: string) {
    if (!keywords.length) {
      SetSearchResults(null);
      return;
    };
    fetchApiSearchResults(keywords)
      .then(SetSearchResults)
      .catch(SetErrorMessageForClient);
  }

  function onBlur() {
    SetSearchResults(null);
  }

  return (<>
    <Header>
      <SeachInput onSubmit={onSubmit} onInput={onSearchInput} onBlur={onBlur} searchResults={searchResults} />
    </Header>
    <main>
      {errorMessageForClient
        ? <Alert message={errorMessageForClient.toString()} />
        : <div className="flex flex-col sm:flex-row">
          <TopGainersLosers topGainersLosersData={topGainersLosers} />
          <div className="py-8 px-2 mx-auto w-full lg:py-16">
            <div className="flex flex-col">
              <Chart data={data} />
            </div>
          </div>
        </div>}
    </main>
  </>
  );
}

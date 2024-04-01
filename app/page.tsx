'use client';

import { Alert } from "@/components/Alert";
import { Chart } from "@/components/Chart";
import { Header } from "@/components/Header";
import { SeachInput } from "@/components/SearchInput";
import { fetchApiData, fetchApiSearchResults, fetchDemolData } from "@/utils/Api";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, SetData] = useState<any>(null);
  const [searchResults, SetSearchResults] = useState<any>(null);
  const [errorMessageForClient, SetErrorMessageForClient] = useState<string | null>(null);

  useEffect(() => {
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
      <div className="py-8 px-2 mx-auto max-w-2xl lg:py-16">
        {errorMessageForClient
          ? <Alert message={errorMessageForClient.toString()} />
          : <div className="flex flex-col">
            <Chart data={data} />
          </div>}
      </div>
    </main>
  </>
  );
}

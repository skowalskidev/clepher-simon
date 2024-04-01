'use client';

import { Alert } from "@/components/Alert";
import { Chart } from "@/components/Chart";
import { SeachInput } from "@/components/SearchInput";
import { fetchApiData, fetchDemolData } from "@/utils/Api";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, SetData] = useState<any>(null);
  const [errorMessageForClient, SetErrorMessageForClient] = useState<string | null>(null);

  useEffect(() => {
    fetchDemolData()
      .then(SetData)
      .catch(SetErrorMessageForClient);
  }, []);

  function onSearchClick(symbol: string) {
    fetchApiData(symbol)
      .then(SetData)
      .catch(SetErrorMessageForClient);
  }

  return (
    <main>
      <SeachInput onSubmit={onSearchClick} />
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        {errorMessageForClient
          ? <Alert message={errorMessageForClient.toString()} />
          : <Chart data={data} />}
      </div>
    </main>
  );
}

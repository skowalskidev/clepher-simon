'use client';

import { Alert } from "@/components/Alert";
import { Chart } from "@/components/Chart";
import { SeachInput } from "@/components/SearchInput";
import { fetchApiData } from "@/utils/Api";
import { useState } from "react";

export default function Home() {
  const [data, SetData] = useState<any>([]);
  const [errorMessageForClient, SetErrorMessageForClient] = useState<string | null>(null);

  function onSearchClick(symbol: string) {
    fetchApiData(symbol)
      .then(transformedData => {
        SetData(transformedData);
      })
      .catch(error => {
        SetErrorMessageForClient(error);
      });
  }

  return (
    <main>
      <SeachInput onSubmit={onSearchClick} />
      {errorMessageForClient ? <Alert message={errorMessageForClient.toString()} /> : <Chart data={data}></Chart>}
    </main>
  );
}

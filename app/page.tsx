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
      {data == null && <div>loading...</div>}
      {errorMessageForClient && <Alert message={errorMessageForClient.toString()} />}
      {data != null && !errorMessageForClient && <Chart data={data} />}
    </main>
  );
}

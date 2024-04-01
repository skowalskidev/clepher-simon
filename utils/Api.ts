export enum FunctionType {
    TIME_SERIES_DAILY = 'TIME_SERIES_DAILY',
    TIME_SERIES_INTRADAY = 'TIME_SERIES_INTRADAY',
    TIME_SERIES_DAILY_ADJUSTED = 'TIME_SERIES_DAILY_ADJUSTED',
    TIME_SERIES_WEEKLY = 'TIME_SERIES_WEEKLY',
    TIME_SERIES_WEEKLY_ADJUSTED = 'TIME_SERIES_WEEKLY_ADJUSTED',
    TIME_SERIES_MONTHLY = 'TIME_SERIES_MONTHLY',
    TIME_SERIES_MONTHLY_ADJUSTED = 'TIME_SERIES_MONTHLY_ADJUSTED',
    MARKET_STATUS = 'MARKET_STATUS',
    // etc...
}

export enum Interval {
    _1min = '1min',
    _5min = '5min',
    _15min = '15min',
    _30min = '30min',
    _60min = '60min',
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY',
    MONTHLY = 'MONTHLY',
}

export function getApiUrl(_function: FunctionType, symbol: string, interval: Interval): string {
    // return `https://www.alphavantage.co/query?function=${_function}&symbol=${symbol}&interval=${interval}&apikey=32urbfbsygcsdjkhk`; // TODO: change to another method of authentication to remove the need to expose the api key to the client
    return `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`;
}

function fetchData(url: string) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                // Check if 'Time Series (Daily)' exists in the data
                if (!data || !data['Time Series (Daily)']) {
                    throw new Error('Invalid response format: Please Contact Support. Details: ' + JSON.stringify(data));
                }
                // Sort data by time TODO: remove this by resolving the unsorted data issue
                const sortedData = Object.entries(data['Time Series (Daily)']).sort((a, b) => new Date(a[0]) - new Date(b[0]));
                const transformedData = sortedData.map(([date, values]: any) => ({
                    time: date,
                    value: parseFloat(values['4. close'])
                }));
                resolve(transformedData);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function fetchApiData(symbol: string) {
    return fetchData(getApiUrl(FunctionType.TIME_SERIES_DAILY, symbol, Interval._15min));
}

export function fetchDemolData() {
    return fetchData("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo");
}
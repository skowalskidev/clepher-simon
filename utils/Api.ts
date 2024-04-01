

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

export interface BestMatch {
    symbol: string,
    name: string,
    type: string,
    region: string,
    marketOpen: string,
    marketClose: string,
    timezone: string,
    currency: string,
    matchScore: string,
}

export type BestMatchResults = BestMatch[] | null;

export interface TopGainerLoser {
    ticker: string,
    price: string,
    changeAmount: string,
    changePercentage: string,
    volume: string,
}

export type TopGainersLosersData = null | {
    topGainers: TopGainerLoser[];
    topLosers: TopGainerLoser[];
};

export function getApiUrl(_function: FunctionType, symbol: string, interval: Interval): string {
    // return `https://www.alphavantage.co/query?function=${_function}&symbol=${symbol}&interval=${interval}&apikey=${process.env.NEXT_PUBLIC_APIKEY}`; // TODO: change to another method of authentication to remove the need to expose the api key to the client
    // TODO: lift api token limits
    return `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=${process.env.NEXT_PUBLIC_DEMO_APIKEY}`;
}

export function getApiSearchUrl(keywords: string): string {
    // return `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${process.env.NEXT_PUBLIC_APIKEY}`; // TODO: change to another method of authentication to remove the need to expose the api key to the client
    // TODO: lift api token limits
    return `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=${process.env.NEXT_PUBLIC_DEMO_APIKEY}`;
}

export function getApiTopGainersLosersUrl(): string {
    return `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${process.env.NEXT_PUBLIC_DEMO_APIKEY}`;
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
                // console.log(data);
                // Check if 'Time Series (Daily)' exists in the data
                if (!data || !data['Time Series (Daily)']) {
                    throw new Error('Invalid response format: Please Contact Support. Details: ' + JSON.stringify(data));
                }
                // Sort data by time TODO: remove this by resolving the unsorted data issue
                // @ts-ignore
                const sortedData = Object.entries(data['Time Series (Daily)']).sort((a, b) => new Date(a[0]) - new Date(b[0]));
                const transformedData = sortedData.map(([date, values]: any) => ({
                    time: date,
                    value: parseFloat(values['4. close'])
                }));
                const dataObject = {
                    symbol: data['Meta Data']['2. Symbol'],
                    data: transformedData,
                }
                resolve(dataObject);
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
    return fetchData(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=${process.env.NEXT_PUBLIC_DEMO_APIKEY}`);
}

function fetchSearchResults(url: string) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (!data || !data.bestMatches) {
                    resolve(null);
                    return;
                }
                // Check if 'Time Series (Daily)' exists in the data
                const bestMatches = data.bestMatches.map((bestMatch: any) => ({
                    symbol: bestMatch["1. symbol"],
                    name: bestMatch["2. name"],
                }))
                resolve(bestMatches);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function fetchApiSearchResults(keywords: string) {
    return fetchSearchResults(getApiSearchUrl(keywords));
}

export function fetchApiTopGainersLosers() {
    return new Promise((resolve, reject) => {
        fetch(getApiTopGainersLosersUrl())
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // console.log(data);
                if (!data || !data.top_gainers || !data.top_losers) {
                    resolve(null);
                    return;
                }
                // Check if 'Time Series (Daily)' exists in the data
                const topGainers = data.top_gainers.slice(0, 4).map((topGainer: any) => ({
                    ticker: topGainer.ticker,
                    price: topGainer.price,
                    changePercentage: topGainer.change_percentage,
                }));
                const topLosers = data.top_losers.slice(0, 4).map((topLoser: any) => ({
                    ticker: topLoser.ticker,
                    price: topLoser.price,
                    changePercentage: topLoser.change_percentage,
                }));
                const topGainersLosers: TopGainersLosersData = {
                    topGainers,
                    topLosers,
                }
                resolve(topGainersLosers);
            })
            .catch(error => {
                reject(error);
            });
    });
}

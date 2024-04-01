import { TopGainerLoser, TopGainersLosersData } from "@/utils/Api";
import { TopGainersLosersSkeleton } from "./TopGainersLosersSkeleton";


export const TopGainersLosers = ({ topGainersLosersData }: { topGainersLosersData: TopGainersLosersData }) => {
    return (
        <>
            {!topGainersLosersData
                ? <TopGainersLosersSkeleton rows={8} />
                : <div className="relative overflow-x-auto p-2 shrink-0">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded overflow-hidden">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Symbol
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    %Change
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {topGainersLosersData?.topGainers.map(({ ticker, price, changePercentage }: TopGainerLoser) => (
                                <tr key={ticker} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {ticker}
                                    </th>
                                    <td className="px-6 py-4">
                                        {price}
                                    </td>
                                    <td className="px-6 py-4 text-green-400">
                                        {changePercentage}
                                    </td>
                                </tr>
                            ))}
                            {topGainersLosersData?.topLosers.map(({ ticker, price, changePercentage }: TopGainerLoser) => (
                                <tr key={ticker} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {ticker}
                                    </th>
                                    <td className="px-6 py-4">
                                        {price}
                                    </td>
                                    <td className="px-6 py-4 text-red-400">
                                        {changePercentage}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }</>
    );
};
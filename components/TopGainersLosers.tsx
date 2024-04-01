import { TopGainerLoser, TopGainersLosersData } from "@/utils/api";
import { TopGainersLosersSkeleton } from "./TopGainersLosersSkeleton";
import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";


export const TopGainersLosers = ({ topGainersLosersData }: { topGainersLosersData: TopGainersLosersData }) => {
    return (
        <>
            {!topGainersLosersData
                ? <TopGainersLosersSkeleton rows={8} />
                : <div className='flex flex-col'>
                    <div className="relative overflow-x-auto p-2 shrink-0">
                        <h4 className="mb-2 text-2xl font-bold dark:text-white">Top Gainers and Losers</h4>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded overflow-hidden">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Symbol
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
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
                                            ${price}
                                        </td>
                                        <td className="flex items-center px-6 py-4 text-green-400">
                                            <FaCaretUp />{changePercentage.toFixed(2)}%
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
                                        <td className="flex items-center px-6 py-4 text-red-400">
                                            <FaCaretDown />{(changePercentage * -1).toFixed(2)}%
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            }</>
    );
};
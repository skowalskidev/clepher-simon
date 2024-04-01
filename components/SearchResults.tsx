import { SearchInputContext } from "@/context/searchInput";
import { BestMatch } from "@/utils/api";
import { useContext } from "react";


export const SearchResults = () => {
    let { searchResults } = useContext(SearchInputContext);
    return (
        <>
            {searchResults && <div className="absolute overflow-x-auto z-50">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <tbody>
                        {searchResults.map(({ symbol, name }: BestMatch) => (
                            <tr key={symbol} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {symbol}
                                </th>
                                <td className="px-6 py-4">
                                    {name}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>}
        </>
    );
}

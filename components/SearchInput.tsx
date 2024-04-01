import { useEffect, useState } from "react";
import { SearchResults } from "./SearchResults";
import { AiOutlineStock } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

interface SearchInputParams {
    onSubmit: (symbol: string) => void;
    onInput: (symbol: string) => void;
    onBlur: () => void;
}

export const SeachInput = ({ onSubmit, onInput, onBlur }: SearchInputParams) => {
    const [input, setInput] = useState("");

    function handleSubmit(event: any) {
        event.preventDefault();
        onSubmit(input);
    }

    useEffect(() => {
        onInput(input);
    }, [input])

    return (
        <form className="flex items-center max-w-sm w-full" onSubmit={handleSubmit}>
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <AiOutlineStock className="text-base text-gray-500 dark:text-gray-400" />
                </div>
                <input value={input} onChange={(event) => setInput(event?.target.value)} onBlur={onBlur} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Symbol search..." required />
                <SearchResults />
            </div>
            <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <FaSearch className="text-base" />
                <span className="sr-only">Search</span>
            </button>
        </form>
    );
}
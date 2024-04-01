

export const ChartSkeleton = () => {
    return (
        <div className="p-2 w-full flex items-center justify-center">
            <div role="status" className="w-full max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                <div className="flex items-baseline mt-4">
                    <div className="w-full bg-gray-200 rounded-t-lg h-36 dark:bg-gray-700"></div>
                    <div className="w-full h-56 ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                    <div className="w-full bg-gray-200 rounded-t-lg h-36 ms-6 dark:bg-gray-700"></div>
                    <div className="w-full h-48 ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
                    <div className="w-full bg-gray-200 rounded-t-lg h-48 ms-6 dark:bg-gray-700"></div>
                    <div className="w-full bg-gray-200 rounded-t-lg h-36 ms-6 dark:bg-gray-700"></div>
                    <div className="w-full bg-gray-200 rounded-t-lg h-48 ms-6 dark:bg-gray-700"></div>
                </div>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};
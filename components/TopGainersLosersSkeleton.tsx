interface TopGainersLosersSkeletonProps {
    rows?: number,
}
export const TopGainersLosersSkeleton = ({ rows = 4 }: TopGainersLosersSkeletonProps) => {
    return (
        <div className="p-2">
            <div role="status" className="w-full min-w-80 max-w-md p-4 space-y-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                {[...Array(rows)].map((_, i) => (
                    <div key={i}>
                        <div className="flex items-center justify-between">
                            <div>
                                <div key={`skeleton-${i}-1`} className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                <div key={`skeleton-${i}-2`} className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                            <div key={`skeleton-${i}-3`} className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                        </div>
                        {i < rows - 1 && <div key={`skeleton-${i}-divider`} className="border border-gray-200 dark:border-gray-700 my-[9px]"></div>}
                    </div>
                ))}
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

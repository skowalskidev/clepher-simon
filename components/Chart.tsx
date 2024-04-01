import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
import { ChartSkeleton } from './ChartSkeleton';


interface Colors {
    backgroundColor: string,
    lineColor: string,
    textColor: string,
    areaTopColor: string,
    areaBottomColor: string,
}
interface ChartProps {
    data: any,
    colors?: Colors;
}

export const Chart = (props: ChartProps) => {
    const {
        data,
        colors: {
            backgroundColor = 'black',
            lineColor = '#2962FF',
            textColor = 'white',
            areaTopColor = '#2962FF',
            areaBottomColor = 'rgba(41, 98, 255, 0.28)',
        } = {},
    } = props;

    const chartContainerRef = useRef();

    useEffect(
        () => {
            if (!chartContainerRef.current || !data) return;
            const handleResize = () => {
                // @ts-ignore
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            };

            // @ts-ignore
            const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { type: ColorType.Solid, color: backgroundColor },
                    textColor,
                },
                grid: {
                    vertLines: { color: '#444' },
                    horzLines: { color: '#444' },
                },
                // @ts-ignore
                width: chartContainerRef.current.clientWidth,
                height: 300,
            });
            chart.timeScale().fitContent();

            const newSeries = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
            newSeries.setData(data.data);

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };
        },
        [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
    );

    return (
        <div className='flex justify-center'>
            {data == null
                ? <ChartSkeleton />
                // @ts-ignore
                : <div className='flex flex-col w-full'>
                    Symbol: {data.symbol}
                    <div ref={chartContainerRef} />
                </div>}
        </div>
    );
};
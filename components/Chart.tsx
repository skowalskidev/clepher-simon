import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';


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
            backgroundColor = 'white',
            lineColor = '#2962FF',
            textColor = 'black',
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
                // @ts-ignore
                width: chartContainerRef.current.clientWidth,
                height: 300,
            });
            chart.timeScale().fitContent();

            const newSeries = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
            newSeries.setData(data);

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };
        },
        [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
    );

    return (
        <>
            {data == null
                ? <div>loading...</div>
                // @ts-ignore
                : <div ref={chartContainerRef} />}
        </>
    );
};
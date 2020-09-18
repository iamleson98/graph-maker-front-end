import React, { memo, useRef, useEffect } from "react";
import Chart, { ChartConfiguration, ChartDataSets } from "chart.js";
import { defaultColors } from "../../constants";


export interface BarChartProps {
    xLabels: string[];
    yDataList: {
        label?: string;
        color?: string;
        data: number[];
    }[];
    chartTitle?: string;
}

function barChartConfig({ xLabels, yDataList, chartTitle }: BarChartProps): ChartConfiguration {

    const dtSets: ChartDataSets[] = yDataList.map((bar, idx) => {
        const { label, color, data } = bar
        return {
            label: label || `Bar ${idx + 1}`,
            backgroundColor: color || defaultColors[idx % defaultColors.length],
            borderWidth: 0,
            data
        }
    })

    return {
        type: "bar",
        data: {
            labels: xLabels,
            datasets: dtSets
        },
        options: {
            responsive: true,
            legend: {
                align: "start",
                position: "bottom",
                fullWidth: false
            },
            title: {
                display: true,
                text: chartTitle || "Bar Chart"
            },
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                yAxes: [{
                    gridLines: {
                        drawBorder: false
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
        },
    }
}

function StdBarchart(props: BarChartProps) {

    const canvasRef = useRef<any>()
    const chartRef = useRef<Chart>()

    useEffect(() => {
        chartRef.current?.destroy()
        chartRef.current = new Chart(
            (canvasRef.current as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D,
            barChartConfig(props)
        )
    }, [props])

    return (
        <canvas ref={canvasRef}></canvas>
    )
}

// export default memo(function () {
//     return <StdBarchart
//         xLabels={["one", "two", "three", "four"]}
//         yDataList={[
//             {
//                 // label: "First",
//                 data: [1, 6, 90, 34]
//             },
//             {
//                 // label: "First",
//                 data: [1, 6, 90, 34]
//             },
//         ]}
//     />
// })

export default memo(StdBarchart)

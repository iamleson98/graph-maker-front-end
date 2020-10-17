import React, { memo } from "react";
import { ChartConfiguration, ChartDataSets } from "chart.js"
import { defaultColors } from "../../../constants"
import CommonStdChart from "./CommonStandard"


export interface LineChartProps {
    xLabels: string[];
    xLabel?: string;
    yLabel?: string;
    yDataList: {
        color?: string;
        label?: string;
        data: number[];
    }[];
    chartTitle?: string;
}

export function lineChartConfig({ xLabels, yDataList, chartTitle, xLabel, yLabel }: LineChartProps): ChartConfiguration {

    const dtSets: ChartDataSets[] = yDataList.map((line, idx) => {
        const { color, label, data } = line
        return {
            label: label || `Line ${idx + 1}`,
            borderColor: color || defaultColors[idx % defaultColors.length],
            data,
            pointRadius: 1,
            fill: false,
            lineTension: 0.2,
            borderWidth: 2,
        }
    })

    return {
        type: "line",
        data: {
            labels: xLabels,
            datasets: dtSets,
        },
        options: {
            responsive: true,
            legend: {
                align: "start",
                position: "bottom",
                fullWidth: false,
                labels: {
                    boxWidth: 12,
                }
            },
            animation: {
                duration: 500,
                easing: "linear"
            },
            title: {
                display: true,
                text: chartTitle || "Line Chart"
            },
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: xLabel || "Label on Ox",
                    },
                    offset: true
                }],
                yAxes: [{
                    // gridLines: {
                    //     drawBorder: false
                    // },
                    ticks: {
                        beginAtZero: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: yLabel || "Label on Oy",
                    }
                }]
            },
            tooltips: {
                intersect: false,
                mode: "index",
            }
        }
    }
}

function StdLineChart(props: LineChartProps) {

    return (
        <CommonStdChart
            config={lineChartConfig(props)}
        />
    )
}

// export default memo(function () {
//     return <StdLineChart
//         xLabels={["one", "two", "three", "four"]}
//         yDataList={[
//             {
//                 label: "hi",
//                 // color: "red",
//                 data: [1, 2, 3, 4]
//             },
//             {
//                 label: "ha",
//                 // color: "green",
//                 data: [1, 7, 10, 4]
//             }
//         ]}
//     />
// })
export default memo(StdLineChart)

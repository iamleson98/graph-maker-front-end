import React, { memo } from "react";
import { ChartConfiguration, ChartDataSets } from "chart.js";
import { defaultColors } from "../../../constants";
import CommonStdChart from "./CommonStandard"


export interface BarChartProps {
    xLabels: string[];
    xLabel?: string;
    yLabel?: string;
    yDataList: {
        label?: string;
        color?: string;
        data: number[];
    }[];
    chartTitle?: string;
}

function barChartConfig({ xLabels, yDataList, chartTitle, xLabel, yLabel }: BarChartProps): ChartConfiguration {

    const dtSets: ChartDataSets[] = yDataList.map((bar, idx) => {
        const { label, color, data } = bar
        return {
            label: label || `Bar ${idx + 1}`,
            backgroundColor: color || defaultColors[idx % defaultColors.length],
            borderWidth: 0,
            data,
            // maxBarThickness: 20
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
                text: chartTitle || "Bar Chart"
            },
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: xLabel || "Label on Ox"
                    }
                }],
                yAxes: [{
                    gridLines: {
                        drawBorder: false
                    },
                    ticks: {
                        beginAtZero: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: yLabel || "Label on Oy"
                    }
                }]
            },
        },
    }
}

function StdBarchart(props: BarChartProps) {

    return (
        <CommonStdChart
            config={barChartConfig(props)}
        />
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

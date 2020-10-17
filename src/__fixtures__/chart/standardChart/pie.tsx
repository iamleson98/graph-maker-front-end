import React, { memo } from "react";
import { ChartConfiguration, ChartDataSets } from "chart.js";
import { defaultColors } from "../../../constants"
import CommonStdChart from "./CommonStandard"


export interface StdPieChartProps {
    labels: string[];
    sliceBackgrounds?: string[];
    data: number[];
    name?: string;
}

export function pieChartConfig({ labels, sliceBackgrounds, data, name }: StdPieChartProps): ChartConfiguration {

    const { length } = defaultColors

    const dtSets: ChartDataSets[] = [{
        data,
        backgroundColor: sliceBackgrounds || (new Array(data.length))
            .fill(null)
            .map((_, idx) => defaultColors[idx % length]),
    }]

    return {
        type: "doughnut",
        data: {
            datasets: dtSets,
            labels,
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
                easing: "linear",
                animateScale: true,
                animateRotate: true
            },
            title: {
                display: true,
                text: name || "Pie chart",
            }
        },
    }
}

function StdPieChart(props: StdPieChartProps) {

    return (
        <CommonStdChart
            config={pieChartConfig(props)}
        />
    )
}

export default memo(StdPieChart)

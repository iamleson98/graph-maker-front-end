import { ChartConfiguration } from "chart.js"
import React, { memo } from "react"
import CommonStdChart from "./CommonStandard"


export interface StdScatterChartProps {
    name?: string;
}

export function scatterChartConfig({ name }: StdScatterChartProps): ChartConfiguration {
    return {
        type: "scatter",
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
                text: name || "Scatter chart"
            }
        }
    }
}

function ScatterStdChart(props: StdScatterChartProps) {
    return (
        <CommonStdChart
            config={scatterChartConfig(props)}
        />
    )
}

export default memo(ScatterStdChart)

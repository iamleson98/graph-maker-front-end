import { ChartConfiguration, ChartDataSets } from "chart.js"
import React, { memo } from "react"
import { defaultColors } from "../../../constants"
import CommonStdChart from "./CommonStandard"


export interface AreaChartProps {
    chartTitle?: string;
    xLabel?: string;
    xLabels: string[];
    yLabel?: string;
    yDataList: {
        color?: string;
        label?: string;
        data: number[];
    }[];
}

function areaChartConfig({ chartTitle, xLabel, yLabel, xLabels, yDataList }: AreaChartProps): ChartConfiguration {
    const { length } = defaultColors
    const dtSets: ChartDataSets[] = yDataList.map((area, idx) => {
        const { color, label, data } = area // color should be rgb

        return {
            backgroundColor: (color || defaultColors[idx % length]),
                // .replace("rgb(", "rgba(").replace(")", ", 0.3)"),
            borderColor: "#fff",
            data,
            borderWidth: 1.5,
            lineTension: 0.0001,
            label,
            pointRadius: 1.5,
            fill: true
        }
    })

    return {
        type: "line",
        data: {
            labels: xLabels,
            datasets: dtSets
        },
        options: {
            spanGaps: false,
            responsive: true,
            elements: {
                line: {
                    tension: 0.000001
                }
            },
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
                text: chartTitle || "Area chart"
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
                    stacked: true,
                    gridLines: {
                        drawBorder: false
                    },
                    ticks: {
                        beginAtZero: true,
                        max: 100,
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

function StdAreaChart(props: AreaChartProps) {
    return (
        <CommonStdChart
            config={areaChartConfig(props)}
        />
    )
}

export default memo(StdAreaChart)

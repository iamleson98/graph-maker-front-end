import React, { memo, useEffect, useRef } from "react";
import Chart, { ChartConfiguration, ChartDataSets } from "chart.js";
import { defaultColors } from "../../constants"


export interface StdPieChartProps {
    labels: string[];
    sliceBackgrounds?: string[];
    data: number[];
    chartTitle?: string;
}

export function pieChartConfig({ labels, sliceBackgrounds, data, chartTitle }: StdPieChartProps): ChartConfiguration {

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
                fullWidth: false
            },
            animation: {
                duration: 500,
                easing: "linear",
                animateScale: true,
                animateRotate: true
            },
            title: {
                display: true,
                text: chartTitle || "Pie chart",
            }
        },
    }
}

function StdPieChart(props: StdPieChartProps) {

    const canvasRef = useRef<any>()
    const chartRef = useRef<Chart>()

    useEffect(() => {
        chartRef.current?.destroy()
        chartRef.current = new Chart(
            (canvasRef.current as HTMLCanvasElement)?.getContext("2d") as CanvasRenderingContext2D,
            pieChartConfig(props)
        )
    }, [props])

    return (
        <canvas ref={canvasRef}></canvas>
    )
}

export default memo(StdPieChart)

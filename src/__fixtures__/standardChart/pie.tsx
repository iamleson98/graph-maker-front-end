import React, { memo, useEffect, useRef } from 'react';
import Chart, { ChartConfiguration, ChartDataSets } from 'chart.js';
import { defaultColors } from "../../constants"


interface StdPieChartProps {
    labels: string[];
    bgColors?: string[];
    data: number[];
}

export function pieChartConfig({ labels, bgColors, data }: StdPieChartProps): ChartConfiguration {

    const { length } = defaultColors

    const dtSets: ChartDataSets[] = [{
        data,
        backgroundColor: bgColors || (new Array(data.length))
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
                animateScale: true,
                animateRotate: true
            },
            title: {
                display: true
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
    }, [])

    return (
        <canvas ref={canvasRef}></canvas>
    )
}

export default memo(StdPieChart)

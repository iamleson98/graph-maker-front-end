import React, { memo, useEffect, useRef } from "react";
import Chart, { ChartConfiguration, ChartDataSets } from "chart.js"


interface LineConfigProps {
    xLabels: string[];
    yDataList: {
        color?: string;
        label?: string;
        data: number[];
    }[];
}

export function lineChartConfig({ xLabels, yDataList }: LineConfigProps): ChartConfiguration {

    const dtSets: ChartDataSets[] = yDataList.map((line) => {
        const { color, label, data } = line
        return {
            label: label || "Label",
            borderColor: color || "#747474",
            data,
            pointRadius: 1,
            fill: false,
            lineTension: 0,
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
                fullWidth: false
            },
            animation: {
                duration: 200
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
            tooltips: {
                intersect: false,
                mode: "index",
            }
        }
    }
}

function StdLineChart(props: LineConfigProps) {

    // reference
    const canvasRef = useRef<any>()
    const chartRef = useRef<Chart>()

    useEffect(() => {
        // destroy chart to draw new of (if chart exists)
        chartRef.current?.destroy()
        chartRef.current = new Chart(
            (canvasRef.current as HTMLCanvasElement)?.getContext("2d") as CanvasRenderingContext2D,
            lineChartConfig(props)
        )
    }, [])

    return (
        <>
            <canvas ref={canvasRef}></canvas>
        </>
    )
}

export default memo(function () {
    return <StdLineChart
        xLabels={["one", "two", "three", "four"]}
        yDataList={[
            {
                label: "hi",
                color: "red",
                data: [1, 2, 3, 4]
            },
            {
                label: "ha",
                color: "green",
                data: [1, 7, 10, 4]
            }
        ]}
    />
})

import React, { memo, useEffect, useRef } from "react"
import Chart, { ChartConfiguration } from "chart.js"


export interface CommonStdChartProps {
    config: ChartConfiguration;
}

function CommonStdChart({ config }: CommonStdChartProps) {

    // references
    const canvasRef = useRef<any>()
    const chartRef = useRef<Chart>()

    useEffect(() => {
        chartRef.current?.destroy()
        chartRef.current = new Chart(
            (canvasRef.current as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D,
            config
        )

        return () => {
            // remove chart data on canvas
            chartRef.current?.destroy()
        }
    }, [config])

    return (
        <canvas
            ref={canvasRef}
        >
        </canvas>
    )
}

export default memo(CommonStdChart)

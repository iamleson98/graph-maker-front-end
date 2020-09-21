import { useReactiveVar } from "@apollo/client"
import React, { memo, useEffect, useState } from "react"
import { localState } from "../.."
import StdPieChart, { StdPieChartProps } from "../../standardChart/pie"
import { updateLocalState } from "../../utils"


function PieDrawer() {

    // get local chart state
    const { pieChartState, chartDrawMutexReleased } = useReactiveVar(localState)

    const [pies, setPies] = useState<StdPieChartProps[]>([])

    useEffect(() => {
        if (!!pieChartState && chartDrawMutexReleased) {
            const { chartTitle, pies } = pieChartState
            const newPies: StdPieChartProps[] = pies.map(pie => {
                const labels: string[] = [],
                    sliceBackgrounds: string[] = [],
                    data: number[] = []

                pie.forEach(slice => {
                    labels.push(slice.name)
                    sliceBackgrounds.push(slice.color)
                    data.push(Number(slice.value))
                })

                return {
                    labels,
                    sliceBackgrounds,
                    data,
                    chartTitle
                }
            })

            setPies(newPies)
            updateLocalState("chartDrawMutexReleased", false)
        }

    }, [pieChartState, chartDrawMutexReleased])

    return (
        <>
            {pies.map((pie, pieIndex) => (
                <div
                    key={pieIndex}
                    className={`${pies.length > 1 ? "w-1/2 sm:w-full" : "w-full"}`}
                    style={{ padding: 2 }}
                >
                    <div className={`${pies.length > 1 ? "border-solid border rounded border-gray-300" : ""}`}>
                        <StdPieChart
                            key={pieIndex}
                            chartTitle={pie.chartTitle}
                            data={pie.data}
                            sliceBackgrounds={pie.sliceBackgrounds}
                            labels={pie.labels}
                        />
                    </div>
                </div>
            ))}
        </>
    )
}

export default memo(PieDrawer)
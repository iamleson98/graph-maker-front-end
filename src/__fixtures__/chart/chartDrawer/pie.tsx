import { useReactiveVar } from "@apollo/client"
import React, { memo, useEffect, useState } from "react"
import { localState } from "../.."
import StdPieChart, { StdPieChartProps } from "../../standardChart/pie"
import { updateLocalState } from "../../utils"


function PieDrawer() {

    // get local chart state
    const { pieChartState, chartDrawMutexReleased } = useReactiveVar(localState)

    const [state, setState] = useState<{
        pies: StdPieChartProps[],
        chartTitle: string;
    }>({
        pies: [],
        chartTitle: "Chart title"
    })
    const { pies, chartTitle } = state

    useEffect(() => {
        if (!!pieChartState && chartDrawMutexReleased) {
            const { chartTitle, pies } = pieChartState
            const newPies: StdPieChartProps[] = pies.map(pie => {
                const labels: string[] = [],
                    sliceBackgrounds: string[] = [],
                    data: number[] = []

                pie.slices.forEach(slice => {
                    labels.push(slice.name)
                    sliceBackgrounds.push(slice.color)
                    data.push(Number(slice.value))
                })

                return {
                    labels,
                    sliceBackgrounds,
                    data,
                    name: pie.name
                }
            })

            setState({
                pies: newPies,
                chartTitle
            })
            updateLocalState("chartDrawMutexReleased", false)
        }

    }, [pieChartState, chartDrawMutexReleased])

    return (
        <div className="w-full">
            <div className="p-1 text-center text-gray-700 font-medium text-sm">
                {chartTitle}
            </div>
            <div className="flex flex-wrap justify-center">
                {pies.map((pie, pieIndex) => (
                    <div
                        key={pieIndex}
                        className={`${pies.length > 1 ? "w-1/2 sm:w-full" : "w-full"}`}
                        style={{ padding: 2 }}
                    >
                        <div className={`${pies.length > 1 ? "border-solid border rounded border-gray-300" : ""}`}>
                            <StdPieChart
                                key={pieIndex}
                                name={pie.name}
                                data={pie.data}
                                sliceBackgrounds={pie.sliceBackgrounds}
                                labels={pie.labels}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default memo(PieDrawer)
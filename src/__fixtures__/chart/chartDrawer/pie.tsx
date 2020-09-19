import { useReactiveVar } from "@apollo/client"
import React, { memo, useEffect, useState } from "react"
import { localState } from "../.."
import StdPieChart, { StdPieChartProps } from "../../standardChart/pie"


function PieDrawer() {

    // get local chart state
    const { pieChartState } = useReactiveVar(localState)

    const [pies, setPies] = useState<StdPieChartProps[]>([])

    useEffect(() => {
        if (!!pieChartState) {
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
        }
    }, [pieChartState])

    return (
        <>
            {pies.map((pie, pieIndex) => (
                <div
                    key={pieIndex}
                    className="w-1/2 sm:w-full p-1"
                >
                    <StdPieChart
                        key={pieIndex}
                        chartTitle={pie.chartTitle}
                        data={pie.data}
                        sliceBackgrounds={pie.sliceBackgrounds}
                        labels={pie.labels}
                    />
                </div>
            ))}
        </>
    )
}

export default memo(PieDrawer)
import { useReactiveVar } from "@apollo/client"
import React, { memo, useEffect, useState } from "react"
import { localState } from "../.."
import StdBarchart, { BarChartProps } from "../../standardChart/bar"


function BarDrawer() {

    // get local chart state
    const { barChartState } = useReactiveVar(localState)

    const [state, setState] = useState<BarChartProps>({
        xLabels: [],
        xLabel: "",
        yLabel: "",
        yDataList: [],
        chartTitle: ""
    })
    const { xLabels, yDataList, chartTitle, xLabel, yLabel } = state

    useEffect(() => {
        if (!!barChartState) {
            const {
                chartTitle,
                yLabel,
                xLabel,
                xData,
                colors,
                yData
            } = barChartState
            const yDataList = yData.map((item, index) => {
                return {

                }
            })
        }
    }, [barChartState])

    return (
        <div className="p-1 rounded border border-solid border-gray-300 w-full">
            <StdBarchart
                xLabels={xLabels}
                xLabel={xLabel}
                yLabel={yLabel}
                yDataList={yDataList}
                chartTitle={chartTitle}
            />
        </div>
    )
}

export default memo(BarDrawer)
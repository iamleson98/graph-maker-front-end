import { useReactiveVar } from "@apollo/client"
import React, { memo, useEffect, useState } from "react"
import { localState } from "../.."
import StdBarchart, { BarChartProps } from "../../standardChart/bar"


function BarDrawer() {

    // get local chart state
    const { barChartState } = useReactiveVar(localState)

    const [state, setState] = useState<BarChartProps>({
        xLabels: [],
        yDataList: [],
        chartTitle: ""
    })
    const { xLabels, yDataList, chartTitle } = state

    useEffect(() => {
        if (!!barChartState) {
            const {
                chartTitle,
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
        <StdBarchart
            xLabels={xLabels}
            yDataList={yDataList}
            chartTitle={chartTitle}
        />
    )
}

export default memo(BarDrawer)
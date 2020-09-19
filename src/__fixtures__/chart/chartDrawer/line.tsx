import { useReactiveVar } from "@apollo/client"
import React, { memo, useEffect, useState } from "react"
import { LocalState } from "../.."
import { localState } from "../../"
import StdLineChart, { LineChartProps } from "../../standardChart/line"


function LineDrawer() {

    // get local chart state
    const { lineChartState } = useReactiveVar<LocalState>(localState)

    const [state, setState] = useState<LineChartProps>({
        xLabels: [],
        yDataList: [],
        chartTitle: ""
    })
    const { xLabels, yDataList, chartTitle } = state

    useEffect(() => {
        if (!!lineChartState) {
            const { chartTitle, xData, yData } = lineChartState
            const newLineChartProps: LineChartProps = {
                xLabels: xData,
                chartTitle,
                yDataList: yData.map(item => {
                    const numberList = item.data.map(itm => Number(itm)) // NOTE: Number("") === 0
                    return {
                        color: item.color,
                        label: item.name,
                        data: numberList
                    }
                })
            }
            setState(newLineChartProps)
        }
    }, [lineChartState])

    return (
        <StdLineChart
            xLabels={xLabels}
            yDataList={yDataList}
            chartTitle={chartTitle}
        />
    )
}

export default memo(LineDrawer)
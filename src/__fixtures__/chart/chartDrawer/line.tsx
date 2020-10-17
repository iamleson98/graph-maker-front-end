import { useReactiveVar } from "@apollo/client"
import React, { memo, useEffect, useState } from "react"
import { LocalState } from "../.."
import { localState } from "../../"
import StdLineChart, { LineChartProps } from "../standardChart/line"
import { updateLocalState } from "../../utils"


function LineDrawer() {

    // get local chart state
    const { lineChartState, chartDrawMutexReleased } = useReactiveVar<LocalState>(localState)

    const [state, setState] = useState<LineChartProps>({
        xLabels: [],
        yDataList: [],
        chartTitle: "",
        xLabel: "",
        yLabel: ""
    })
    const { xLabels, yDataList, chartTitle, xLabel, yLabel } = state

    useEffect(() => {
        if (!!lineChartState && chartDrawMutexReleased) {
            const { chartTitle, xData, yData, xLabel, yLabel } = lineChartState
            const newLineChartProps: LineChartProps = {
                xLabels: xData,
                chartTitle,
                xLabel,
                yLabel,
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
            updateLocalState("chartDrawMutexReleased", false)
        }
    }, [lineChartState, chartDrawMutexReleased])

    return (
        <div className="rounded w-full p-1">
            <StdLineChart
                xLabels={xLabels}
                xLabel={xLabel}
                yLabel={yLabel}
                yDataList={yDataList}
                chartTitle={chartTitle}
            />
        </div>
    )
}

export default memo(LineDrawer)
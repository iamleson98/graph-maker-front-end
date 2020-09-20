import { useReactiveVar } from "@apollo/client"
import React, { memo, useEffect, useState } from "react"
import { LocalState } from "../.."
import { localState } from "../../"
import { isRealNumber } from "../../../constants"
import StdLineChart, { LineChartProps } from "../../standardChart/line"


function LineDrawer() {

    // get local chart state
    const { lineChartState } = useReactiveVar<LocalState>(localState)

    const [state, setState] = useState<LineChartProps>({
        xLabels: [],
        yDataList: [],
        chartTitle: "",
        xLabel: "",
        yLabel: ""
    })
    const { xLabels, yDataList, chartTitle, xLabel, yLabel } = state

    useEffect(() => {
        if (!!lineChartState) {
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
        }
    }, [lineChartState])

    return (
        <div className="rounded border border-solid w-full p-1 border-gray-300">
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
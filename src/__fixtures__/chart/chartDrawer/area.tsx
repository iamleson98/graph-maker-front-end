import { useReactiveVar } from "@apollo/client"
import React, { memo, useEffect, useState } from "react"
import { localState } from "../.."
import { updateLocalState } from "../../utils"
import StdAreaChart, { AreaChartProps } from "../standardChart/area"


function Area() {

    // get local chart state
    const { areaChartState, chartDrawMutexReleased } = useReactiveVar(localState)

    const [state, setState] = useState<AreaChartProps>({
        xLabels: [],
        xLabel: "",
        yLabel: "",
        chartTitle: "",
        yDataList: []
    })
    const { xLabels, yLabel, xLabel, chartTitle, yDataList } = state

    useEffect(() => {
        if (!!areaChartState && chartDrawMutexReleased) {
            const { xData, xLabel, yLabel, chartTitle, yData } = areaChartState
            const newAreaChartProps: AreaChartProps = {
                xLabels: xData,
                chartTitle,
                xLabel,
                yLabel,
                yDataList: yData.map(item => {
                    const numberList = item.data.map(item => Number(item))
                    return {
                        color: item.color,
                        label: item.name,
                        data: numberList
                    }
                })
            }
            setState(newAreaChartProps)
            updateLocalState("chartDrawMutexReleased", false)
        }
    }, [areaChartState, chartDrawMutexReleased])

    return (
        <div className="p-1 w-full">
            <StdAreaChart
                xLabels={xLabels}
                xLabel={xLabel}
                chartTitle={chartTitle}
                yLabel={yLabel}
                yDataList={yDataList}
            />
        </div>
    )
}

export default memo(Area)
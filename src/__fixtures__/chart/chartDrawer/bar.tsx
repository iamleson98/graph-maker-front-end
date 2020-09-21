import { useReactiveVar } from "@apollo/client"
import React, { memo, useEffect, useState } from "react"
import { localState } from "../.."
import StdBarchart, { BarChartProps } from "../../standardChart/bar"
import { updateLocalState } from "../../utils"


function BarDrawer() {

    // get local chart state
    const { barChartState, chartDrawMutexReleased } = useReactiveVar(localState)

    const [state, setState] = useState<BarChartProps>({
        xLabels: [],
        xLabel: "",
        yLabel: "",
        yDataList: [],
        chartTitle: ""
    })
    const { xLabels, yDataList, chartTitle, xLabel, yLabel } = state

    useEffect(() => {
        if (!!barChartState && chartDrawMutexReleased) {
            const {
                chartTitle,
                yLabel: yLabel_,
                xLabel: xLabel_,
                xData,
                colors,
                yData
            } = barChartState
            let newDataList: {
                label?: string;
                color?: string;
                data: number[];
            }[] = []
            const { length } = yData[0] // get number of bars in a block
            for (let i = 0; i < length; i++) {
                let label = "";
                const yDataListDataItem = yData.map(block => {
                    label = block[i].name
                    return Number(block[i].value)
                })
                newDataList.push({
                    label,
                    data: yDataListDataItem,
                    color: colors[i]
                })
            }
            setState({
                chartTitle,
                xLabels: xData,
                xLabel: xLabel_,
                yLabel: yLabel_,
                yDataList: newDataList
            })
            updateLocalState("chartDrawMutexReleased", false)
        }
    }, [barChartState, chartDrawMutexReleased])

    return (
        <div className="p-1 w-full">
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
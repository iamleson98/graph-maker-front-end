import { useQuery } from "@apollo/client"
import React, { memo, useEffect, useState } from "react"
import { GET_CURRENT_CHART_STATE } from "../../../graphql/queries"
import { LineChartState } from "../../lineChartInput/reducer"
import StdLineChart, { LineChartProps } from "../../standardChart/line"


function LineDrawer() {

    // get local chart state
    const { data, loading } = useQuery(GET_CURRENT_CHART_STATE)

    const [state, setState] = useState<LineChartProps>({
        xLabels: [],
        yDataList: [],
        chartTitle: ""
    })
    const { xLabels, yDataList, chartTitle } = state

    useEffect(() => {
        if (!!data && !!data.currentChartState) {
            const { chartTitle, xData, yData }: LineChartState = data.currentChartState
            const newLineChartProps: LineChartProps = {
                xLabels: xData,
                chartTitle,
                yDataList: yData.map(item => {
                    const numberList = item.data.map(itm => Number(itm))
                    return {
                        color: item.color,
                        label: item.name,
                        data: numberList
                    }
                })
            }
            setState(newLineChartProps)
        }
    }, [data])

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <StdLineChart
            xLabels={xLabels}
            yDataList={yDataList}
            chartTitle={chartTitle}
        />
    )
}

export default memo(LineDrawer)
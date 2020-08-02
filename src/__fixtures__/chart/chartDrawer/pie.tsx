import React, { memo, useState, useEffect } from 'react'
import { PieChartState } from '../../pieChartInput/reducer'
import StandardPieChart from '../../standardChart/pie'
import { isRealNumber } from '../../constants'


export interface PieRenderParam {
    data: PieChartState;
}

interface PieRenderError {
    pieNumber: number;
    sliceNumber: number;
    message: string;
}

interface PieRenderResult {
    data: {
        name: string;
        value: number;
    }[][];
}

type PiesData = {
    name: string;
    value: number;
}[][]

function PieRender({ data }: PieRenderParam) {

    const [state, setState] = useState<{
        error: PieRenderError[];
        pieData: PiesData;
    }>({
        pieData: [],
        error: [],
    })
    const { pieData, error } = state

    useEffect(() => {
        // validate input data:
        let error: PieRenderError[] = []
        let pieData: PiesData = []

        data.pies.forEach((pie, index) => {
            pieData.push([])
            pie.forEach((slice, idx) => {
                if (!isRealNumber.test(slice.value)) {
                    error.push({
                        pieNumber: index + 1,
                        sliceNumber: idx + 1,
                        message: `${slice.value} is not a number`
                    })
                } else {
                    pieData[index].push({
                        name: slice.name,
                        value: Number(slice.value)
                    })
                }
            })
        })

        setState({
            ...state, error, pieData
        })

    }, [data.pies, state])

    return (
        <>
            {!!error.length && (
                <div>
                    {error.map((err, index) => (
                        <div
                            key={index}
                            className=""
                        >

                        </div>
                    ))}
                </div>
            )}

        </>
    )
}

export default memo(PieRender)

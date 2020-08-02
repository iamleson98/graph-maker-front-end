import React, { memo, useReducer } from 'react'
import { Add, Remove } from '@material-ui/icons'
import Tooltip from '@material-ui/core/Tooltip'
import DelayInput from '../../components/delayinput'
import '../../tailwind/out.css'

import { BarchartState, BarchartAction, typeChange, barchartReducer } from './reducer'


function BarChartInput() {

    // component state
    const [state, dispatch] = useReducer<React.Reducer<BarchartState, BarchartAction>>(barchartReducer, {
        chartTitle: "",
        xTitle: "",
        yTitle: "",
        xData: [""],
        yData: [
            [""]
        ]
    })
    let { xData, yData, chartTitle, xTitle, yTitle } = state

    const handleAddXItem = (clickedIndex: number) => () => {
        dispatch({
            type: typeChange[!clickedIndex ? "addXFieldChange" : "removeXFieldChange"],
            value: !!clickedIndex ? clickedIndex : undefined,
        })
    }

    const handleYItemClick = (clickedIndex: number) => {
        dispatch({
            type: typeChange[!clickedIndex ? "addYFieldChange" : "removeYFieldChange"],
            value: !!clickedIndex ? clickedIndex : undefined,
        })
    }

    return (
        <div className="text-gray-700 bg-white rounded p-2 max-w-xs">
            {/* title */}
            <div className="mb-4">
                <label htmlFor="barchart-title" className="mr-2">Title</label>
                <DelayInput
                    type="text"
                    id="barchart-title"
                    className="rounded bg-gray-200 py-1 px-2"
                    placeholder="Chart title"
                    defaultValue={chartTitle}
                    giveValue={(value: string) => dispatch({
                        type: typeChange.chartTitleChange,
                        value
                    })}
                />
            </div>

            <div
                className=""
            >
                <div className="mb-4">
                    {/* x title */}
                    <div className="mb-2">
                        <label htmlFor="x-title" className="mr-2">X title</label>
                        <DelayInput
                            type="text"
                            id="x-title"
                            className="rounded bg-gray-200 py-1 px-2"
                            placeholder="X title"
                            defaultValue={xTitle}
                            giveValue={(value: string) => dispatch({
                                type: typeChange.xTitleChange,
                                value
                            })}
                        />
                    </div>
                    {/* x data */}
                    <fieldset className="rounded p-3 border-2 border-solid border-gray-200">
                        <legend className="text-sm leading-4 font-medium text-red-500">X data</legend>
                        {xData.map((value, idx) => (
                            <div className="flex items-center mb-1" key={idx}>
                                <span className="mr-2 text-sm">{idx + 1}</span>
                                <DelayInput
                                    type="text"
                                    className="rounded mr-2 bg-gray-200 py-1 px-2"
                                    placeholder="Enter data"
                                    defaultValue={value}
                                    giveValue={(value: string) => {
                                        dispatch({
                                            type: typeChange.xFieldChange,
                                            value: idx,
                                            options: {
                                                value
                                            }
                                        })
                                    }}
                                />
                                <Tooltip title={!idx ? "Add item" : "Remove item"} placement="top">
                                    <span
                                        onClick={handleAddXItem(idx)}
                                        className={`flex cursor-pointer items-center justify-center rounded ${!idx ? "bg-blue-100 text-blue-600" : "bg-orange-100 text-orange-600"} w-8 h-8 hover:${!idx ? "bg-blue-200" : "bg-orange-200"}`}
                                        title=""
                                    >
                                        {!idx ? <Add fontSize="small" /> : <Remove fontSize="small" />}
                                    </span>
                                </Tooltip>
                            </div>
                        ))}
                    </fieldset>
                </div>

                <div className="mb-4">
                    {/* y title */}
                    <div className="mb-2">
                        <label htmlFor="y-title" className="mr-2">Y title</label>
                        <DelayInput
                            type="text"
                            id="y-title"
                            className="rounded bg-gray-200 py-1 px-2"
                            placeholder="X title"
                            defaultValue={yTitle}
                            giveValue={(value: string) => dispatch({
                                type: typeChange.yTitleChange,
                                value
                            })}
                        />
                    </div>
                    {/* y data */}
                    <fieldset className="rounded p-3 border-2 border-solid border-gray-200">
                        <legend className="text-sm leading-4 text-red-500 font-medium">Y data</legend>
                        {yData.map((block, index) => (
                            <fieldset key={index} className="rounded border-solid border-2 border-gray-200 p-3 mb-2">
                                <legend className="text-xs leading-4 font-normal">
                                    block {index + 1}
                                </legend>
                                {block.map((item, idx) => (
                                    <div className="flex items-center mb-1" key={idx}>
                                        <span className="mr-2 text-xs">{idx + 1}</span>
                                        <DelayInput
                                            type="text"
                                            className="rounded mr-2 bg-gray-200 px-2"
                                            placeholder="Enter data"
                                            defaultValue={item}
                                            giveValue={(value: string) => {
                                                dispatch({
                                                    type: typeChange.yFieldChange,
                                                    value: index,
                                                    options: {
                                                        index: idx,
                                                        value
                                                    }
                                                })
                                            }}
                                        />
                                        <Tooltip title={!idx ? "Add item" : "Remove item"} placement="top">
                                            <span
                                                onClick={() => {
                                                    // ony buttons in the first fieldset are clickable
                                                    if (index === 0) {
                                                        handleYItemClick(idx)
                                                    }
                                                }}
                                                className={`flex cursor-pointer items-center justify-center rounded ${!!index ? "cursor-not-allowed" : ""} ${!idx ? "bg-blue-100 text-blue-600" : "bg-orange-100 text-orange-600"} w-8 h-8 hover:${!idx ? "bg-blue-200" : "bg-orange-200"}`}
                                            >
                                                {!index && (
                                                    // only buttons in first fieldset are clickable
                                                    <>
                                                        {!idx ? <Add fontSize="small" /> : <Remove fontSize="small" />}
                                                    </>
                                                )}
                                            </span>
                                        </Tooltip>
                                    </div>
                                ))}
                            </fieldset>
                        ))}
                    </fieldset>
                </div>
            </div>
        </div >
    )
}

export default memo(BarChartInput)

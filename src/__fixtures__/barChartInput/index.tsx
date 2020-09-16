import React, { memo, useReducer } from "react"
import { Add, Remove } from "@material-ui/icons"
import Tooltip from "@material-ui/core/Tooltip"
import DelayInput from "../../components/delayinput"
import { BarchartState, BarchartAction, typeChange, barchartReducer } from "./reducer"
import ColorSettter from "../colorSetter"
import { defaultFieldColor } from "../../constants"


function BarChartInput(): JSX.Element {

    // component state
    const [state, dispatch] = useReducer<React.Reducer<BarchartState, BarchartAction>>(barchartReducer, {
        chartTitle: "",
        xTitle: "",
        yTitle: "",
        xData: [""],
        colors: [defaultFieldColor],
        yData: [
            {
                error: undefined,
                data: [""]
            }
        ],
        allGood: false
    })
    let { xData, yData, chartTitle, xTitle, yTitle, colors } = state;

    const manipulateAnXField = (clickedIndex: number) => () => {
        // clickedIndex is in range of [0, negative number].
        // if it is 0, it means we wanna add a field, otherwise, means delete a field with a value is index of that field
        dispatch({
            type: typeChange[!clickedIndex ? "addXFieldChange" : "removeXFieldChange"],
            value: !!clickedIndex ? clickedIndex : undefined,
        })
    }

    const handleYItemClick = (clickedIndex: number) => {
        // add button(+) is at index 0, delete button(-) is at greater than 0 indexes.
        dispatch({
            type: typeChange[!clickedIndex ? "addYFieldChange" : "removeYFieldChange"],
            value: !!clickedIndex ? clickedIndex : undefined,
        })
    }

    return (
        <div className="text-gray-700 bg-white rounded p-2">
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

            <div className="">
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
                    <fieldset className="rounded p-2 border-2 border-solid border-gray-200">
                        <legend className="text-sm leading-4 font-medium text-red-500">X data</legend>
                        {xData.map((value, idx) => (
                            <div className="flex items-center mb-1" key={idx}>
                                <span className="mr-2 text-sm">{idx + 1}</span>
                                <DelayInput
                                    fullWidth={true}
                                    type="text"
                                    className="rounded mr-2 bg-gray-200 py-1 px-2"
                                    placeholder="Enter data"
                                    defaultValue={value}
                                    giveValue={(value: string) => {
                                        dispatch({
                                            type: typeChange.xFieldChange, // type of change
                                            value: idx,                    // index of that field
                                            options: {
                                                value                      // new value for that field
                                            }
                                        })
                                    }}
                                />
                                <Tooltip title={!idx ? "Add item" : "Remove item"} placement="top">
                                    <span
                                        onClick={manipulateAnXField(idx)}
                                        className={`flex cursor-pointer items-center flex-shrink-0 justify-center rounded ${!idx ? "bg-blue-100 text-blue-600" : "bg-orange-100 text-orange-600"} w-8 h-8 hover:${!idx ? "bg-blue-200" : "bg-orange-200"}`}
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
                            placeholder="Y title"
                            defaultValue={yTitle}
                            giveValue={(value: string) => dispatch({
                                type: typeChange.yTitleChange, // type of change
                                value                          // value for that field
                            })}
                        />
                    </div>
                    {/* y data */}
                    <fieldset className="rounded p-2 border-2 border-solid border-gray-200">
                        <legend className="text-sm leading-4 text-red-500 font-medium">Y data</legend>
                        {yData.map((block, index) => (
                            <fieldset key={index} className="rounded border-solid border-2 border-gray-200 p-2 mb-2">
                                <legend className="text-xs leading-4 font-normal">
                                    block {index + 1}
                                </legend>
                                {block.data.map((barValue, idx) => (
                                    <div className="flex items-center mb-1" key={idx}>
                                        <span className="mr-2 text-xs">{idx + 1}</span>
                                        <DelayInput
                                            fullWidth={true}
                                            type="text"
                                            className={`rounded mr-2 bg-gray-200 px-2 ${block.error ? "bg-red-300" : ""}`}
                                            placeholder="Enter data"
                                            defaultValue={barValue}
                                            giveValue={(value: string) => {
                                                dispatch({
                                                    type: typeChange.yFieldChange,// type of change
                                                    value: index,                 // index of that block (each block contains 1 or more bars)
                                                    options: {
                                                        index: idx,               // index of the bar we need to change value
                                                        value                     // new value for that bar
                                                    }
                                                })
                                            }}
                                            endAdornment={index === 0 && (
                                                <ColorSettter
                                                    defaultBg={colors[idx]}
                                                    giveColor={(color: string) => dispatch({
                                                        type: typeChange.colorChange,
                                                        value: idx,
                                                        options: {
                                                            value: color
                                                        }
                                                    })}
                                                />
                                            )}
                                        />
                                        {!index && (
                                            <Tooltip
                                                title={!idx ? "Add item" : "Remove item"}
                                                placement="top"
                                            >
                                                <span
                                                    onClick={() => handleYItemClick(idx)}
                                                    className={`flex cursor-pointer items-center flex-shrink-0 justify-center rounded w-8 h-8 hover:${!idx ? "bg-blue-200" : "bg-orange-200"} ${!idx ? "bg-blue-100 text-blue-600" : "bg-orange-100 text-orange-600"}`}
                                                >
                                                    {!idx ? <Add fontSize="small" /> : <Remove fontSize="small" />}
                                                </span>
                                            </Tooltip>
                                        )}
                                    </div>
                                ))}
                                {/* error */}
                                {!!block.error && <small className="text-red-600">{block.error}</small>}
                            </fieldset>
                        ))}
                    </fieldset>
                </div>
            </div>
        </div >
    )
}

export default memo(BarChartInput)

import React, { memo, useEffect, useReducer } from "react"
import { Add, Remove } from "@material-ui/icons"
import Tooltip from "@material-ui/core/Tooltip"
import DelayInput from "../../components/delayinput"
import { BarchartState, BarchartAction, typeChange, barchartReducer } from "./reducer"
import ColorSettter from "../colorSetter"
import { localState } from ".."
import { noAnyError } from "../utils"


function BarChartInput(): JSX.Element {

    // component state
    const [state, dispatch] = useReducer<React.Reducer<BarchartState, BarchartAction>>(barchartReducer, localState().barChartState)
    let { xData, yData, chartTitle, xLabel, yLabel, colors } = state;

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

    useEffect(() => {
        if (noAnyError(
            state.yData
                .map(block => block.map(bar => bar.error))
                .reduce((a, b) => a.concat(b), [])
        )
        ) {
            localState({
                ...localState(),
                barChartState: state,
                chartDrawMutexReleased: true
            })
        }
    }, [state])

    return (
        <div className="text-gray-600 bg-white rounded p-2">
            {/* title */}
            <div className="mb-4">
                <label htmlFor="barchart-title" className="mr-2 text-sm font-medium">Chart title</label>
                <DelayInput
                    type="text"
                    id="barchart-title"
                    className="rounded bg-gray-200 px-2"
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
                        <label htmlFor="x-title" className="mr-2 text-sm">Ox label</label>
                        <DelayInput
                            type="text"
                            id="x-title"
                            className="rounded bg-gray-200 px-2"
                            placeholder="Ox label"
                            defaultValue={xLabel}
                            giveValue={(value: string) => dispatch({
                                type: typeChange.xLabelChange,
                                value
                            })}
                        />
                    </div>
                    {/* x data */}
                    <fieldset className="rounded p-2 border-2 border-solid border-gray-200">
                        <legend className="text-sm leading-4 font-medium text-red-500">Data on Ox</legend>
                        {xData.map((value, idx) => (
                            <div className="flex items-center mb-1" key={idx}>
                                <span className="mr-2 text-sm">{idx + 1}</span>
                                <DelayInput
                                    fullWidth={true}
                                    type="text"
                                    className="rounded mr-2 bg-gray-200 px-2"
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
                        <label htmlFor="y-title" className="mr-2 text-sm">Oy label</label>
                        <DelayInput
                            type="text"
                            id="y-title"
                            className="rounded bg-gray-200 px-2"
                            placeholder="Oy label"
                            defaultValue={yLabel}
                            giveValue={(value: string) => dispatch({
                                type: typeChange.yLabelChange, // type of change
                                value                          // value for that field
                            })}
                        />
                    </div>
                    {/* y data */}
                    <fieldset className="rounded p-2 border-2 border-solid border-gray-200">
                        <legend className="text-sm leading-4 text-red-500 font-medium">Data on Oy</legend>
                        {yData.map((block, blockIndex) => (
                            <fieldset key={blockIndex} className="rounded border-solid border-2 border-gray-200 p-2 mb-2">
                                <legend className="text-xs leading-4 font-normal">
                                    {`block ${xData[blockIndex] || blockIndex + 1}`}
                                </legend>
                                {block.map((barValue, barIndex) => (
                                    <div className="flex items-center mb-1" key={barIndex}>
                                        <span className="mr-2 text-xs">{barIndex + 1}</span>
                                        <div className="rounded w-full border-2 border-solid border-gray-200 p-2 mr-2">
                                            {!blockIndex ? ( // blockIndex === 0
                                                <DelayInput
                                                    fullWidth={true}
                                                    type="text"
                                                    className={`rounded mb-1 bg-gray-200 px-2`}
                                                    placeholder="Enter name"
                                                    defaultValue={barValue.name}
                                                    giveValue={(value: string) => {
                                                        dispatch({
                                                            type: typeChange.yFieldNameChange,          // type of change
                                                            value: barIndex,                            // index of bar (each block contains 1 or more bars)
                                                            options: {
                                                                value                                   // new value for that bar
                                                            }
                                                        })
                                                    }}
                                                    endAdornment={blockIndex === 0 && (
                                                        <ColorSettter
                                                            defaultBg={colors[barIndex]}
                                                            giveColor={(color: string) => dispatch({
                                                                type: typeChange.colorChange,
                                                                value: barIndex,
                                                                options: {
                                                                    value: color
                                                                }
                                                            })}
                                                        />
                                                    )}
                                                />
                                            ) : (
                                                    <div className="flex items-center mb-1">
                                                        <span className="text-xs mr-2">name</span>
                                                        <span className="text-sm font-medium">{barValue.name}</span>
                                                    </div>
                                                )
                                            }
                                            <DelayInput
                                                fullWidth={true}
                                                type="text"
                                                className={`rounded bg-gray-200 px-2 ${barValue.error ? "bg-red-300" : ""}`}
                                                placeholder="Enter value"
                                                defaultValue={barValue.value}
                                                giveValue={(value: string) => {
                                                    dispatch({
                                                        type: typeChange.yFieldValueChange,         // type of change
                                                        value: blockIndex,                          // index of that block (each block contains 1 or more bars)
                                                        options: {
                                                            index: barIndex,                        // index of the bar we need to change value
                                                            value                                   // new value for that bar
                                                        }
                                                    })
                                                }}
                                            />
                                            {!!barValue.error && <small className="text-red-600">{barValue.error}</small>}
                                        </div>

                                        {!blockIndex && (
                                            <Tooltip
                                                title={!barIndex ? "Add item" : "Remove item"}
                                                placement="top"
                                            >
                                                <span
                                                    onClick={() => handleYItemClick(barIndex)}
                                                    className={`flex cursor-pointer items-center flex-shrink-0 justify-center rounded w-8 h-8 hover:${!barIndex ? "bg-blue-200" : "bg-orange-200"} ${!barIndex ? "bg-blue-100 text-blue-600" : "bg-orange-100 text-orange-600"}`}
                                                >
                                                    {!barIndex ? <Add fontSize="small" /> : <Remove fontSize="small" />}
                                                </span>
                                            </Tooltip>
                                        )}
                                    </div>
                                ))}
                            </fieldset>
                        ))}
                    </fieldset>
                </div>
            </div >
        </div >
    )
}

export default memo(BarChartInput)

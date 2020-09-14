import React, { memo, useReducer, useEffect } from "react"
import DelayInput from "../../components/delayinput"
import { Add, Remove } from "@material-ui/icons"
import Tooltip from "@material-ui/core/Tooltip"
import { Button } from "@material-ui/core"

import {
    lineChartReducer, LineChartAction,
    LineChartState, typeChange, MAX_LINES
} from "./reducer"
import { localState } from "../index"
import ColorSetter from "../colorSetter"
import { defaultFieldColor } from "../../constants"


function LineChart(): JSX.Element {

    // component state
    const [state, dispatch] = useReducer<React.Reducer<LineChartState, LineChartAction>>(lineChartReducer, {
        chartTitle: "",
        xData: [""],
        yData: [
            {
                name: "",
                data: [""],
                color: defaultFieldColor
            }
        ],
        allGood: false
    })
    const { chartTitle, xData, yData, allGood } = state

    useEffect(() => {
        const prevState = localState()
        localState({
            ...prevState,
            canClickDrawChart: allGood
        })
    }, [allGood])

    return (
        <div className="rounded bg-white p-2 text-gray-700">
            {/* title */}
            <div className="mb-4">
                <label htmlFor="linechart-title" className="mr-2 text-base">Title</label>
                <DelayInput
                    type="text"
                    id="linechart-title"
                    className="bg-gray-200 rounded py-1 px-2"
                    defaultValue={chartTitle}
                    placeholder="Chart title"
                    giveValue={(value: string) => dispatch({
                        type: typeChange.titleChange,
                        value
                    })}
                />
            </div>

            <div className="">
                {/* x data */}
                <fieldset className="rounded border-2 border-gray-200 border-solid mb-4 p-2">
                    <legend className="text-sm font-medium text-red-500">
                        X data
                    </legend>
                    {xData.map((item, idx) => (
                        <div className="flex items-center justify-around mb-1" key={idx}>
                            <span className="text-xs mr-1">{idx + 1}</span>
                            <DelayInput
                                fullWidth={true}
                                type="text"
                                placeholder="value"
                                className="rounded bg-gray-200 mr-1 py-1 px-2"
                                defaultValue={item}
                                giveValue={(value: string) => dispatch({
                                    type: typeChange.xFieldChange,
                                    value: idx,
                                    options: {
                                        value
                                    }
                                })}
                            />
                            <Tooltip
                                title={!idx ? "Add x field" : "Remove this field"}
                                placement="top"
                            >
                                <div
                                    className={`w-8 h-8 flex-shrink-0 cursor-pointer rounded flex items-center justify-center ${!idx ? "bg-blue-100 hover:bg-blue-200" : "bg-orange-100 hover:bg-orange-200"}`}
                                    onClick={() => {
                                        dispatch({
                                            type: typeChange[!idx ? "addXField" : "deleteXField"],
                                            value: idx
                                        })
                                    }}
                                >
                                    {!idx ? <Add className="text-blue-600" fontSize="small" /> : <Remove className="text-orange-600" fontSize="small" />}
                                </div>
                            </Tooltip>
                        </div>
                    ))}
                </fieldset>

                {/* y data */}
                <fieldset className="mb-4 rounded border-2 border-solid border-gray-200 p-2">
                    <legend className="font-medium text-red-500 text-sm">
                        Y data
                    </legend>
                    {yData.map((item, index) => (
                        <fieldset
                            key={index}
                            className="border-2 border-solid border-gray-200 rounded p-2 mb-2"
                        >
                            <legend>
                                <DelayInput
                                    fullWidth={true}
                                    type="text"
                                    className="px-2 text-xs w-40 rounded bg-gray-200"
                                    giveValue={(value: string) => dispatch({
                                        type: typeChange.lineNameChange,
                                        value: index,
                                        options: {
                                            value
                                        }
                                    })}
                                    defaultValue={item.name}
                                    placeholder={`line ${index + 1} name`}
                                    endAdornment={(
                                        <ColorSetter
                                            giveColor={(color: string) => dispatch({
                                                type: typeChange.colorChange,
                                                value: index,
                                                options: {
                                                    value: color
                                                }
                                            })}
                                        />
                                    )}
                                />
                            </legend>
                            {item.data.map((field, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center mb-1 justify-around"
                                >
                                    <span className="text-xs mr-2">{idx + 1}</span>
                                    <DelayInput
                                        fullWidth={true}
                                        type="text"
                                        placeholder="value"
                                        className={`rounded ${item.error ? "bg-red-300" : "bg-gray-200"} px-2 mr-2`}
                                        giveValue={(value: string) => dispatch({
                                            type: typeChange.yFieldChange,
                                            value: index,
                                            options: {
                                                value,
                                                index: idx
                                            }
                                        })}
                                        defaultValue={field}
                                    />
                                </div>
                            ))}
                            {!!item.error && <small className="text-red-600 mb-2">{item.error}</small>}
                            {!!index && (
                                <div>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="secondary"
                                        className="focus:outline-none mb-2"
                                        disableElevation={true}
                                        fullWidth={true}
                                        onClick={() => {
                                            dispatch({
                                                type: typeChange.deleteLine,
                                                value: index
                                            })
                                        }}
                                    >
                                        delete {!!item.name ? item.name : `line ${index + 1}`}
                                    </Button>
                                </div>
                            )}
                        </fieldset>
                    ))}
                    <Tooltip
                        title={yData.length < MAX_LINES ? "Add another line" : `At most ${MAX_LINES} lines allowed`}
                        placement="top"
                    >
                        <div>
                            <Button
                                size="small"
                                color="primary"
                                disabled={yData.length >= MAX_LINES}
                                disableElevation={true}
                                fullWidth={true}
                                variant="contained"
                                className="focus:outline-none"
                                onClick={() => dispatch({
                                    type: typeChange.addLine
                                })}
                            >
                                Add line
                            </Button>
                        </div>
                    </Tooltip>
                </fieldset>
            </div>
        </div>
    )
}

export default memo(LineChart)

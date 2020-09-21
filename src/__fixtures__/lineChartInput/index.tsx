import React, { memo, useEffect, useReducer } from "react"
import DelayInput from "../../components/delayinput"
import { Add, Remove } from "@material-ui/icons"
import Tooltip from "@material-ui/core/Tooltip"
import { Button } from "@material-ui/core"
import {
    lineChartReducer, LineChartAction,
    LineChartState, typeChange, MAX_LINES,
} from "./reducer"
import ColorSetter from "../colorSetter"
import { localState } from ".."
import { noAnyError } from "../utils"


function LineChart(): JSX.Element {

    // component state
    const [state, dispatch] = useReducer<React.Reducer<LineChartState, LineChartAction>>(lineChartReducer, localState().lineChartState)
    const { chartTitle, xData, yData, xLabel, yLabel } = state

    useEffect(() => {
        if (noAnyError(state.yData.map(line => line.error))) {
            localState({
                ...localState(),
                lineChartState: state,
                chartDrawMutexReleased: true
            })
        }
    }, [state])

    return (
        <div className="rounded bg-white p-2 text-gray-600">
            {/* chart title */}
            <div className="mb-4">
                <label htmlFor="linechart-title" className="mr-2 text-sm font-medium">Chart Title</label>
                <DelayInput
                    type="text"
                    id="linechart-title"
                    className="bg-gray-200 rounded px-2"
                    defaultValue={chartTitle}
                    placeholder="Chart title"
                    giveValue={(value: string) => dispatch({
                        type: typeChange.titleChange,
                        value
                    })}
                />
            </div>

            <div className="">
                <div className="mb-4">
                    {/* title on Ox */}
                    <div className="mb-2">
                        <label htmlFor="x-label" className="mr-2 text-sm">Ox label</label>
                        <DelayInput
                            type="text"
                            id="x-label"
                            className="rounded bg-gray-200 px-2"
                            placeholder="Ox label"
                            defaultValue={xLabel}
                            giveValue={(value: string) => {
                                dispatch({
                                    type: typeChange.xLabelChange,
                                    value: value.trim()
                                })
                            }}
                        />
                    </div>

                    {/* x data */}
                    <fieldset className="rounded border-2 border-gray-200 border-solid mb-4 p-2">
                        <legend className="text-sm font-medium text-red-500">
                            Data on Ox
                        </legend>
                        {xData.map((item, idx) => (
                            <div className="flex items-center justify-around mb-1" key={idx}>
                                <span className="text-xs mr-2">{idx + 1}</span>
                                <DelayInput
                                    fullWidth={true}
                                    type="text"
                                    placeholder="value"
                                    className="rounded bg-gray-200 mr-2 px-2"
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
                </div>

                <div>
                    {/* title on oy */}
                    <div className="mb-2">
                        <div className="mb-2">
                            <label htmlFor="y-label" className="mr-2 text-sm">Oy label</label>
                            <DelayInput
                                type="text"
                                id="y-label"
                                className="rounded bg-gray-200 px-2"
                                placeholder="Oy label"
                                defaultValue={yLabel}
                                giveValue={(value: string) => {
                                    dispatch({
                                        type: typeChange.yLabelChange,
                                        value: value.trim()
                                    })
                                }}
                            />
                        </div>
                    </div>

                    {/* Data on Oy */}
                    <fieldset className="mb-4 rounded border-2 border-solid border-gray-200 p-2">
                        <legend className="font-medium text-red-500 text-sm">
                            Data on Oy
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
                                                giveColor={(color: string) => {
                                                    if (color !== item.color) { // only update state if colors don't match
                                                        dispatch({
                                                            type: typeChange.colorChange,
                                                            value: index,
                                                            options: {
                                                                value: color
                                                            }
                                                        })
                                                    }
                                                }}
                                                defaultBg={item.color}
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
                    </fieldset>
                </div>
            </div>
        </div>
    )
}

export default memo(LineChart)

import React, { memo, useEffect, useReducer } from "react"
import DelayInput from "../../components/delayinput"
import Button from "@material-ui/core/Button"
import { DeleteOutlined } from "@material-ui/icons"
import Tooltip from "@material-ui/core/Tooltip"
import {
    PieChartAction,
    PieChartState,
    typeChange,
    MAX_PIE,
    pieChartReducer,
} from "./reducer"
import ColorSettter from "../colorSetter"
import { localState } from ".."
import { noAnyError } from "../utils"


function PieChart(): JSX.Element {

    // component state
    const [state, dispatch] = useReducer<React.Reducer<PieChartState, PieChartAction>>(pieChartReducer, localState().pieChartState)
    let { chartTitle, pies } = state

    useEffect(() => {
        // to tell current chart drawer to re-draw chart
        // since React notifies errors if drawer component and input component update simultaneously
        if (noAnyError(
            state.pies
                .map(pie => pie.map(slice => slice.error))
                .reduce((a, b) => a.concat(b), [])
        )) {
            localState({
                ...localState(),
                chartDrawMutexReleased: true,
                pieChartState: state
            })
        }
    }, [state])

    return (
        <div className="text-gray-600 bg-white rounded p-2">
            {/* title */}
            <div className="mb-4">
                <label htmlFor="piechart-title" className="mr-2 text-sm font-medium">Chart title</label>
                <DelayInput
                    type="text"
                    placeholder="Chart title"
                    className="rounded bg-gray-200 px-2"
                    giveValue={(value: string) => dispatch({
                        type: typeChange.titleChange,
                        value
                    })}
                    defaultValue={chartTitle}
                />
            </div>

            <div className="mb-2">
                {pies.map((pie, pieIndex) => (
                    <fieldset
                        key={pieIndex}
                        className="rounded border-2 border-solid border-gray-200 p-2 mb-3"
                    >
                        <legend className="text-sm text-red-500 font-medium">
                            Pie {pieIndex + 1}
                        </legend>
                        {pie.map((slice, sliceIndex) => (
                            <div className="flex items-center mb-2" key={sliceIndex}>
                                <fieldset className="p-2 rounded w-full border-2 mr-2 border-solid border-gray-200">
                                    <legend className="text-sm">
                                        Slice {sliceIndex + 1}
                                    </legend>
                                    {!pieIndex ? (
                                        <div className="mb-1 flex items-center">
                                            <span className="mr-2 text-xs">name</span>
                                            <DelayInput
                                                fullWidth={true}
                                                placeholder="slice name"
                                                defaultValue={slice.name}
                                                className={`rounded bg-gray-200 px-2`}
                                                classes={{
                                                    input: !!pieIndex ? "cursor-not-allowed" : "initial"
                                                }}
                                                giveValue={(value: string) => dispatch({
                                                    type: typeChange.sliceNameChange,
                                                    value: sliceIndex,
                                                    options: {
                                                        value
                                                    }
                                                })}
                                                disabled={!!pieIndex}
                                                endAdornment={pieIndex === 0 && (
                                                    <ColorSettter
                                                        giveColor={(color: string) => dispatch({
                                                            type: typeChange.colorChange,
                                                            value: sliceIndex,
                                                            options: {
                                                                value: color
                                                            }
                                                        })}
                                                        defaultBg={slice.color}
                                                    />
                                                )}
                                            />
                                        </div>
                                    ) : (
                                            <div className="mb-1 flex items-center">
                                                <span className="mr-2 text-xs">name</span>
                                                <span className="text-sm font-medium">{slice.name}</span>
                                            </div>
                                        )}
                                    <div className="flex items-center">
                                        <span className="mr-2 text-xs">value</span>
                                        <DelayInput
                                            fullWidth={true}
                                            placeholder="value"
                                            className={`rounded ${slice.error ? "bg-red-300" : "bg-gray-200"} px-2`}
                                            giveValue={(value: string) => dispatch({
                                                type: typeChange.sliceValueChange,
                                                value: pieIndex,
                                                options: {
                                                    index: sliceIndex,
                                                    value
                                                }
                                            })}
                                            defaultValue={slice.value}
                                        />
                                    </div>
                                    {!!slice.error && <small className="text-red-600">{slice.error}</small>}
                                </fieldset>
                                {!!sliceIndex && !pieIndex && (
                                    // only display this button in fields that has pieIndex greater than 0
                                    <div className="text-right">
                                        <Tooltip
                                            title="Delete this slice"
                                            placement="top"
                                        >
                                            <span
                                                className="w-6 h-6 rounded bg-red-100 hover:bg-red-200 inline-flex items-center justify-center cursor-pointer"
                                                onClick={() => dispatch({
                                                    type: typeChange.deleteSlice,
                                                    value: sliceIndex
                                                })}
                                            >
                                                <DeleteOutlined color="secondary" fontSize="inherit" />
                                            </span>
                                        </Tooltip>
                                    </div>
                                )}
                            </div>
                        ))}
                        <Button
                            size="small"
                            variant="contained"
                            disableElevation={true}
                            color={!pieIndex ? "primary" : "secondary"}
                            fullWidth={true}
                            className="focus:outline-none"
                            onClick={() => dispatch({
                                type: typeChange[!pieIndex ? "addSlice" : "deletePie"],
                                value: pieIndex
                            })}
                        >
                            {!pieIndex ? "Add a slice" : `Remove pie ${pieIndex + 1}`}
                        </Button>
                    </fieldset>
                ))}
                <Button
                    size="small"
                    color="primary"
                    disableElevation={true}
                    variant="contained"
                    className="focus:outline-none"
                    fullWidth={true}
                    onClick={() => dispatch({
                        type: typeChange.addPie
                    })}
                    disabled={pies.length >= MAX_PIE}
                >
                    Add pie
                </Button>
            </div>
        </div>
    )
}

export default memo(PieChart)

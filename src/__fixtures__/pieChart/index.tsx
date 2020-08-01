import React, { memo, useReducer } from 'react'
import DelayInput from '../../components/delayinput'
import Button from '@material-ui/core/Button'
import { Add, DeleteOutlined } from '@material-ui/icons'
import Tooltip from '@material-ui/core/Tooltip'


enum typeChange {
    addPie,
    deletePie,
    titleChange,
    addSlice,
    deleteSlice,
    sliceNameChange,
    sliceValueChange,
}

export interface PieChartState {
    chartTitle: string;
    pies: {
        name: string;
        value: string;
    }[][]
}

interface PieChartAction {
    type: typeChange;
    value?: any;
    options?: {
        value?: any;
    };
}

// constants
const MAX_SLICES_PER_PIE = 15, MAX_PIE = 4

function pieChartReducer(state: PieChartState, action: PieChartAction): PieChartState {
    let newState = state
    let { pies } = state
    const { type, value, options } = action

    switch (type) {
        case typeChange.addPie:
            if (pieChartReducer.length < MAX_PIE) {
                const newPie = pies[0].map(pie => {
                    return { ...pie, value: "" }
                })
                pies.push(newPie)
                newState = { ...newState, pies }
            }
            break
        case typeChange.deletePie:
            // value holds index of pie to remove
            pies = pies.filter((_, idx) => idx !== value)
            newState = { ...state, pies }
            break
        case typeChange.titleChange:
            newState = { ...newState, chartTitle: action.value }
            break
        case typeChange.addSlice:
            if (pies[0].length < MAX_SLICES_PER_PIE) {
                pies = pies.map(pie => {
                    return pie.concat({
                        name: "",
                        value: ""
                    })
                })
                newState = { ...newState, pies }
            }
            break
        case typeChange.deleteSlice:
            // value hold index to remove
            pies = pies.map(pie => {
                return pie.filter((_, id) => id !== value)
            })
            newState = { ...newState, pies }
            break
        case typeChange.sliceNameChange:
            // value is index, options.value is value
            pies = pies.map(pie => {
                return pie.map((slice, idx) => {
                    const { name } = slice
                    return {
                        ...slice,
                        name: idx === value ? options?.value : name,
                    }
                })
            })
            newState = { ...state, pies }
            break
        case typeChange.sliceValueChange:
            // value is index of slice to update, options.value is value for that field
            pies = pies.map(pie => {
                return pie.map((slice, idx) => {
                    return {
                        ...slice,
                        value: idx === value ? options?.value : slice.value
                    }
                })
            })
            newState = { ...newState, pies }
            break

        default:
            break
    }

    return newState
}

function PieChart() {

    // component state
    const [state, dispatch] = useReducer<React.Reducer<PieChartState, PieChartAction>>(pieChartReducer, {
        chartTitle: "",
        pies: [
            [
                {
                    name: "",
                    value: ""
                }
            ]
        ]
    })
    let { chartTitle, pies } = state

    return (
        <div className="text-gray-700 bg-white rounded p-2 max-w-xs border border-solid">
            {/* title */}
            <div className="mb-4">
                <label htmlFor="piechart-title" className="mr-2">Title</label>
                <DelayInput
                    type="text"
                    placeholder="Chart title"
                    className="rounded bg-gray-200 py-1 px-2"
                    giveValue={(value: string) => dispatch({
                        type: typeChange.titleChange,
                        value
                    })}
                    defaultValue={chartTitle}
                />
            </div>

            <div className="mb-2">
                {pies.map((pie, index) => (
                    <fieldset
                        key={index}
                        className="rounded border-2 border-solid border-gray-200 p-2 mb-3"
                    >
                        <legend className="text-sm text-red-500 font-medium">
                            Pie {index + 1}
                        </legend>
                        {pie.map((data, idx) => (
                            <div className="flex items-center" key={idx}>
                                <fieldset
                                    className="p-2 rounded border-2 border-solid border-gray-200 mb-2 mr-2"
                                >
                                    <legend className="text-sm">
                                        Slice {idx + 1}
                                    </legend>
                                    <div
                                        className="text-xs text-gray-600 mb-1"
                                    >
                                        <div className="mb-1 flex items-center">
                                            <span className="mr-2">name</span>
                                            <DelayInput
                                                placeholder={data.name}
                                                className={`rounded bg-gray-200 px-2`}
                                                classes={{
                                                    input: !!index ? "cursor-not-allowed" : "initial"
                                                }}
                                                giveValue={(value: string) => dispatch({
                                                    type: typeChange.sliceNameChange,
                                                    value: idx,
                                                    options: {
                                                        value
                                                    }
                                                })}
                                                disabled={!!index}
                                            // defaultValue={data.name}
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <span className="mr-2">value</span>
                                            <DelayInput
                                                placeholder="value"
                                                className="rounded bg-gray-200 px-2"
                                                giveValue={(value: string) => dispatch({
                                                    type: typeChange.sliceValueChange,
                                                    value: idx,
                                                    options: {
                                                        value
                                                    }
                                                })}
                                                defaultValue={data.value}
                                            />
                                        </div>
                                    </div>
                                </fieldset>
                                {!!idx && !index && (
                                    // only display this button in fields that has index greater than 0
                                    <div className="text-right">
                                        <Tooltip
                                            title="Delete this slice"
                                            placement="top"
                                        >
                                            <span
                                                className="w-6 h-6 rounded bg-red-100 hover:bg-red-200 inline-flex items-center justify-center cursor-pointer"
                                                onClick={() => dispatch({
                                                    type: typeChange.deleteSlice,
                                                    value: idx
                                                })}
                                            >
                                                <DeleteOutlined color="secondary" fontSize="inherit" />
                                            </span>
                                        </Tooltip>
                                    </div>
                                )}
                            </div>
                        ))}
                        <Tooltip
                            title={!index ? "Add another slice" : `Remove pie ${index + 1}`}
                            placement="top"
                        >
                            <Button
                                size="small"
                                variant="contained"
                                disabled={pies[0].length >= MAX_SLICES_PER_PIE}
                                disableElevation={true}
                                color={!index ? "primary" : "secondary"}
                                fullWidth={true}
                                className="focus:outline-none"
                                onClick={() => dispatch({
                                    type: typeChange[!index ? "addSlice" : "deletePie"],
                                    value: index
                                })}
                            >
                                {!index ? "Add a slice" : `Remove pie ${index + 1}`}
                            </Button>
                        </Tooltip>
                    </fieldset>
                ))}
                <Tooltip
                    title={pies.length < MAX_PIE ? "Add another pie" : "At most 4 pies allowed"}
                    placement="top"
                >
                    <div>
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
                            <Add />
                        </Button>
                    </div>
                </Tooltip>
            </div>
        </div>
    )
}

export default memo(PieChart)

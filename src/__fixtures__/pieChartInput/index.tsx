import React, { memo, useReducer, useEffect } from 'react'
import DelayInput from '../../components/delayinput'
import Button from '@material-ui/core/Button'
import { Add, DeleteOutlined } from '@material-ui/icons'
import Tooltip from '@material-ui/core/Tooltip'
import {
    PieChartAction, PieChartState, typeChange,
    MAX_PIE,
    // MAX_SLICES_PER_PIE, 
    pieChartReducer
} from './reducer'


interface PieChartParam {
    giveState: (value: PieChartState) => void;
}

function PieChart({ giveState }: PieChartParam): JSX.Element {

    // component state
    const [state, dispatch] = useReducer<React.Reducer<PieChartState, PieChartAction>>(pieChartReducer, {
        chartTitle: "",
        pies: [
            [
                {
                    name: "",
                    value: "",
                    error: undefined,
                }
            ]
        ],
        allGood: false
    })
    let { chartTitle, pies } = state

    // give state to parent component
    useEffect(() => {
        giveState(state)
    })

    return (
        <div className="text-gray-700 bg-white rounded p-2 max-w-xs">
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
                                <fieldset className="p-2 rounded border-2 border-solid border-gray-200 mb-2">
                                    <legend className="text-sm">
                                        Slice {idx + 1}
                                    </legend>
                                    <div className="mb-1 flex items-center">
                                        <span className="mr-2 text-xs">name</span>
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
                                        <span className="mr-2 text-xs">value</span>
                                        <DelayInput
                                            placeholder="value"
                                            className={`rounded ${data.error ? "bg-red-300" : "bg-gray-200"} px-2`}
                                            giveValue={(value: string) => dispatch({
                                                type: typeChange.sliceValueChange,
                                                value: index,
                                                options: {
                                                    index: idx,
                                                    value
                                                }
                                            })}
                                            defaultValue={data.value}
                                        />
                                    </div>
                                    {!!data.error && <small className="text-red-600">{data.error}</small>}
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
                        <Button
                            size="small"
                            variant="contained"
                            // disabled={pies[0].length >= MAX_SLICES_PER_PIE}
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

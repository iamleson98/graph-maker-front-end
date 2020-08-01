import React, { memo, useReducer } from 'react'
import { Add, Remove } from '@material-ui/icons'
import Tooltip from '@material-ui/core/Tooltip'
import DelayInput from '../../components/delayinput'
import '../../tailwind/out.css'
// import {
//     BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as Toolt, Legend,
// } from 'recharts';


// const data = [
//     {
//         name: '1998', uv: 4000, pv: 2400, amt: 2400,
//     },
//     {
//         name: '2000', uv: 3000, pv: 1398, amt: 2210,
//     },
//     {
//         name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
//     },
//     {
//         name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
//     },
//     {
//         name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
//     },
//     {
//         name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
//     },
//     {
//         name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
//     },
// ];

// function Example() {
//     return (
//         <BarChart
//             width={500}
//             height={300}
//             data={data}
//             margin={{
//                 top: 5, right: 30, left: 20, bottom: 5,
//             }}
//         >
//             {/* <CartesianGrid strokeDasharray="3 3" /> */}
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Toolt />
//             <Legend />
//             <Bar dataKey="pv" fill="#8884d8" />
//             <Bar dataKey="uv" fill="#82ca9d" />
//             <Bar dataKey="amt" fill="#848484" />
//         </BarChart>
//     );
// }



enum typeChange {
    chartTitleChange,
    xTitleChange,
    yTitleChange,
    xDataFieldChange,
    addXFieldChange,
    removeXFieldChange,
    addYFieldChange,
    removeYFieldChange,
    xFieldChange,
    yFieldChange,
}

export interface BarchartState {
    chartTitle: string;
    xTitle: string;
    yTitle: string;
    xData: string[];
    yData: string[][];
}

export interface BarchartAction {
    type: typeChange;
    value?: any;
    options?: {
        index?: any;
        value?: any;
    };
}

function barchartReducer(state: BarchartState, action: BarchartAction): BarchartState {
    let newState = state;
    let { xData, yData } = state
    const { type, value, options } = action

    switch (type) {
        case typeChange.chartTitleChange:
            newState = { ...newState, chartTitle: value }
            break
        case typeChange.xTitleChange:
            newState = { ...newState, xTitle: value }
            break
        case typeChange.yTitleChange:
            newState = { ...newState, yTitle: value }
            break
        case typeChange.xDataFieldChange:
            // value will be index, options.value will be value for that field
            xData[value] = options?.value
            newState = { ...newState, xData }
            break
        case typeChange.addXFieldChange:
            if (xData.length <= 14) {
                let newYData = yData
                xData = xData.concat("")
                newYData.push(
                    [...(new Array(yData[0].length))].map(() => "") // since cannot concat an array to an array
                )
                newState = { ...newState, xData, yData: newYData }
            }
            break
        case typeChange.removeXFieldChange:
            // value will be the index to remove
            xData = xData.filter((_, idx) => idx !== value)
            yData = yData.filter((_, idx) => idx !== value)
            newState = { ...newState, xData, yData }
            break
        case typeChange.addYFieldChange:
            yData = yData.map(block => block.concat(""))
            newState = { ...newState, yData }
            break
        case typeChange.removeYFieldChange:
            // index to remove will be hold in option.value
            yData = yData.map(block => block.filter((_, idx) => idx !== value))
            newState = { ...newState, yData }
            break
        case typeChange.xFieldChange:
            // value is index of x field to update, options contains value for that field
            xData[value] = options?.value
            newState = { ...newState, xData }
            break
        case typeChange.yFieldChange:
            // value is index of y block, options.value is data for that, options.index is index of that field
            yData[value][options?.index] = options?.value
            newState = { ...newState, yData }
            break

        default:
            break
    }

    return newState;
}

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
        <div className="text-gray-700 bg-white rounded p-2 max-w-xs border border-solid">
            {/* title */}
            <div className="mb-4">
                <label htmlFor="barchart-title" className="mr-2">Title</label>
                <DelayInput
                    type="text"
                    id="barchart-title"
                    className="rounded bg-gray-200 py-1 px-2"
                    placeholder="Enter title"
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

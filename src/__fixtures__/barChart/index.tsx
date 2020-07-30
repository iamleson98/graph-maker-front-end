import React, { memo, useState } from 'react'
import { Add, Remove, NotInterested } from '@material-ui/icons'
import Tooltip from '@material-ui/core/Tooltip'
import DelayInput from '../../components/delayinput'
import '../../tailwind/out.css'


function BarChartInput() {

    // component state
    const [state, setState] = useState({
        xData: [""],
        yData: [
            [""],
        ]
    })
    let { xData, yData } = state

    const handleAddXItem = (clickedIndex: number) => () => {
        if (!clickedIndex && xData.length <= 14) { // clickedIndex === 0
            xData = xData.concat("")
            yData.push(
                [...(new Array(yData[0].length))].map(() => "")
            )
        } else {
            xData = xData.filter((_, idx) => idx !== clickedIndex)
            yData = yData.filter((_, idx) => idx !== clickedIndex)
        }
        setState({
            ...state,
            xData,
            yData
        })
    }


    const handleYItemClick = (clickedIndex: number) => () => {
        if (!clickedIndex) {
            yData = yData.map(block => block.concat(""))
        } else {
            yData = yData.map(block => block.filter((_, idx) => idx !== clickedIndex))
        }
        setState({
            ...state,
            yData
        })
    }

    const log = (value: string) => {
        console.log(value)
    }

    return (
        <div className="text-gray-600 bg-white rounded p-2 max-w-xs border border-solid">
            {/* title */}
            <div className="mb-4">
                <label htmlFor="barchart-title" className="mr-2">Title</label>
                <DelayInput
                    type="text"
                    id="barchart-title"
                    className="rounded bg-gray-200 py-1 px-2"
                    placeholder="Enter title"
                    giveValue={log}
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
                            giveValue={log}
                        />
                    </div>
                    {/* x data */}
                    <fieldset className="rounded p-3 border border-2 border-solid border-gray-200">
                        <legend className="text-sm leading-4 font-normal">X data</legend>
                        {xData.map((data, idx) => (
                            <div className="flex items-center mb-1" key={idx}>
                                <span className="mr-2 text-sm">{idx + 1}</span>
                                <DelayInput
                                    type="text"
                                    className="rounded mr-2 bg-gray-200 py-1 px-2"
                                    placeholder="Enter data"
                                    defaultValue={data}
                                    giveValue={log}
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
                            giveValue={log}
                        />
                    </div>
                    {/* y data */}
                    <fieldset className="rounded p-3 border border-2 border-solid border-gray-200">
                        <legend className="text-sm leading-4 font-normal">Y data</legend>
                        {yData.map((block, index) => (
                            <fieldset key={index} className="rounded border border-solid border-2 border-gray-200 p-3 mb-2">
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
                                            giveValue={log}
                                        />
                                        <Tooltip title={!idx ? "Add item" : "Remove item"} placement="top">
                                            <span
                                                onClick={handleYItemClick(idx)}
                                                className={`flex cursor-pointer items-center justify-center rounded ${!!index ? "cursor-not-allowed" : ""} ${!idx ? "bg-blue-100 text-blue-600" : "bg-orange-100 text-orange-600"} w-8 h-8 hover:${!idx ? "bg-blue-200" : "bg-orange-200"}`}
                                            >
                                                {!index && (
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

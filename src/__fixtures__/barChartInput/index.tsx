import React, { memo, useEffect, useReducer } from "react"
import { Add, Remove } from "@material-ui/icons"
import Tooltip from "@material-ui/core/Tooltip"
import DelayInput from "../delayinput"
import { BarchartState, BarchartAction, typeChange, barchartReducer } from "./reducer"
import ColorSettter from "../colorSetter"
import { localState } from ".."
import { noAnyError } from "../utils"
import { useTranslation } from "react-i18next"


function BarChartInput(): JSX.Element {

    // trans
    const { t } = useTranslation()

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
        // add button(+) is at index 0, delete button(-) are at positions other than 0.
        dispatch({
            type: typeChange[!clickedIndex ? "addYFieldChange" : "removeYFieldChange"],
            value: !!clickedIndex ? clickedIndex : undefined,
        })
    }

    useEffect(() => {
        if (
            noAnyError(
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
                <label htmlFor="barchart-title" className="mr-2 text-sm font-medium">{t("chartInput.title")}</label>
                <DelayInput
                    type="text"
                    id="barchart-title"
                    className="rounded bg-gray-200 px-2"
                    placeholder={t("chartInput.title")}
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
                        <label htmlFor="x-title" className="mr-2 text-sm">{t("chartInput.xLabel")}</label>
                        <DelayInput
                            type="text"
                            id="x-title"
                            className="rounded bg-gray-200 px-2"
                            placeholder={t("chartInput.xLabel")}
                            defaultValue={xLabel}
                            giveValue={(value: string) => dispatch({
                                type: typeChange.xLabelChange,
                                value
                            })}
                        />
                    </div>
                    {/* x data */}
                    <fieldset className="rounded p-2 border-2 border-solid border-gray-200">
                        <legend className="text-sm leading-4 font-medium text-red-500">{t("chartInput.dataOnOx")}</legend>
                        {xData.map((value, idx) => (
                            <div className="flex items-center mb-1" key={idx}>
                                <span className="mr-2 text-sm">{idx + 1}</span>
                                <DelayInput
                                    fullWidth={true}
                                    type="text"
                                    className="rounded mr-2 bg-gray-200 px-2"
                                    placeholder={`${t("chartInput.bar.placeholder.enterBlockName")}`}
                                    defaultValue={value}
                                    giveValue={(value: string) => {
                                        dispatch({
                                            type: typeChange.xFieldChange,              // type of change
                                            value: idx,                                 // index of that field
                                            options: {
                                                value                                   // new value for that field
                                            }
                                        })
                                    }}
                                />
                                <Tooltip title={!idx ? `${t("chartInput.addItem")}` : `${t("chartInput.removeItem")}`} placement="top">
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
                        <label htmlFor="y-title" className="mr-2 text-sm">{t("chartInput.yLabel")}</label>
                        <DelayInput
                            type="text"
                            id="y-title"
                            className="rounded bg-gray-200 px-2"
                            placeholder={t("chartInput.yLabel")}
                            defaultValue={yLabel}
                            giveValue={(value: string) => dispatch({
                                type: typeChange.yLabelChange,          // type of change
                                value                                   // value for that field
                            })}
                        />
                    </div>
                    {/* y data */}
                    <fieldset className="rounded p-2 border-2 border-solid border-gray-200">
                        <legend className="text-sm leading-4 text-red-500 font-medium">{t("chartInput.dataOnOy")}</legend>
                        {yData.map((block, blockIndex) => (
                            <fieldset key={blockIndex} className="rounded border-solid border-2 border-gray-200 p-2 mb-2">
                                <legend className="text-xs leading-4 font-normal">
                                    {`${t("chartInput.bar.block")} ${xData[blockIndex] || blockIndex + 1}`}
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
                                                    placeholder={`${t("chartInput.bar.placeholder.enterName")}`}
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
                                                        <span className="text-xs mr-2">{t("chartInput.bar.barName")}</span>
                                                        <span className="text-sm font-medium">{barValue.name}</span>
                                                    </div>
                                                )
                                            }
                                            <DelayInput
                                                fullWidth={true}
                                                type="text"
                                                className={`rounded bg-gray-200 px-2 ${barValue.error ? "bg-red-300" : ""}`}
                                                placeholder={`${t("chartInput.bar.placeholder.enterValue")}`}
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
                                                title={!barIndex ? `${t("chartInput.addItem")}` : `${t("chartInput.removeItem")}`}
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
            </div>
        </div>
    )
}

export default memo(BarChartInput)

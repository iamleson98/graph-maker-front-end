import { isRealNumber, defaultFieldColor } from "../../constants"
import { noAnyError, updateLocalState } from "../utils"


export interface LineChartState {
    chartTitle: string;
    xData: string[];
    yData: {
        color: string;
        name: string;
        data: string[];
        error?: string;
    }[],
}

export const InitLineChartState: LineChartState = {
    chartTitle: "",
    xData: [""],
    yData: [
        {
            name: "",
            data: [""],
            color: defaultFieldColor
        }
    ]
}

export enum typeChange {
    titleChange,
    addXField,
    deleteXField,
    addLine,
    deleteLine,
    xFieldChange,
    yFieldChange,
    lineNameChange,
    colorChange,
}

export interface LineChartAction {
    type: typeChange;
    value?: any;
    options?: {
        index?: any;
        value?: any;
    }
}

// constants
export const MAX_POINTS = 25, MAX_LINES = 5

type error = string | undefined
function lineChartErrorChecker(data: string[]): error {
    return data.some(item => !isRealNumber.test(item)) ? "values need to be numbers" : undefined
}

export function lineChartReducer(state: LineChartState, action: LineChartAction): LineChartState {
    let newState = state
    const { type, value, options } = action
    let { xData, yData } = state

    switch (type) {
        case typeChange.titleChange:
            newState = { ...state, chartTitle: value }
            break
        case typeChange.addXField:
            if (xData.length < MAX_POINTS) {
                xData = xData.concat("")
                yData = yData.map(item => {
                    return {
                        ...item,
                        data: item.data.concat("")
                    }
                })
                newState = { ...newState, xData, yData }
            }
            break
        case typeChange.deleteXField:
            // value hold index of to be deleted field
            xData = xData.filter((_, idx) => idx !== value)
            yData = yData.map(item => {
                let data = item.data.filter((_, id) => id !== value)
                return {
                    ...item,
                    data,
                    error: lineChartErrorChecker(data)
                }
            })
            newState = { ...newState, xData, yData }
            break
        case typeChange.addLine:
            yData = yData.concat({
                name: "",
                data: [...(new Array(xData.length))].map(() => ""),
                color: defaultFieldColor
            })
            newState = { ...newState, yData }
            break
        case typeChange.deleteLine:
            // value is index of line to be deleted
            yData = yData.filter((_, idx) => idx !== value)
            newState = { ...newState, yData }
            break
        case typeChange.xFieldChange:
            // value is index, options.value is value for it
            xData[value] = options?.value
            newState = { ...newState, xData }
            break
        case typeChange.yFieldChange:
            // value is index of line, options.index is index of field, options.value is value for it
            yData[value].data[options?.index] = options?.value
            let error = lineChartErrorChecker(yData[value].data)
            yData[value].error = error
            newState = { ...newState, yData }
            break
        case typeChange.lineNameChange:
            // value is index, options.value is value for it
            yData[value].name = options?.value
            newState = { ...newState, yData }
            break
        case typeChange.colorChange:
            // value is line index, options.value is color for that line
            // yData[value].color = options?.value
            const newYData = [...yData]
            newYData[value].color = options?.value
            newState = { ...state, yData: newYData }
            break
        default:
            break
    }

    // check if there is no error, update local state
    if (noAnyError(yData.map(line => line.error))) {
        updateLocalState("lineChartState", newState)
    }

    return newState
}
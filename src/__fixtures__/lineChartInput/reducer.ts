import { isRealNumber } from "../constants"

export interface LineChartState {
    chartTitle: string;
    xData: string[];
    yData: {
        name: string;
        data: string[];
        error?: string;
    }[]
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
                return {
                    ...item,
                    data: item.data.filter((_, id) => id !== value)
                }
            })
            newState = { ...newState, xData, yData }
            break
        case typeChange.addLine:
            yData = yData.concat({
                name: "",
                data: [...(new Array(xData.length))].map(() => ""),
                error: undefined
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
            let error = yData[value].data.some(val => !isRealNumber.test(val)) ? "values must be numbers" : undefined
            yData[value].error = error
            newState = { ...newState, yData }
            break
        case typeChange.lineNameChange:
            // value is index, options.value is value for it
            yData[value].name = options?.value
            newState = { ...newState, yData }
            break
        default:
            break
    }

    return newState
}
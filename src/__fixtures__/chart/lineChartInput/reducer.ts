import { isRealNumber, defaultFieldColor } from "../../../constants"


export interface LineChartState {
    chartTitle: string;
    xData: string[];
    xLabel: string;
    yLabel: string;
    yData: {
        color: string;
        name: string;
        data: string[];
        error?: string;
    }[];
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
    xLabelChange,
    yLabelChange,
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
    const { type, value, options } = action
    const { xData, yData } = state

    switch (type) {
        case typeChange.titleChange:
            state = { ...state, chartTitle: value }
            break
        case typeChange.addXField:
            if (xData.length < MAX_POINTS) {
                state = {
                    ...state,
                    xData: xData.concat(""),
                    yData: yData.map(item => {
                        return {
                            ...item,
                            data: item.data.concat("")
                        }
                    })
                }
            }
            break
        case typeChange.deleteXField:
            // value hold index of to be deleted field
            state = {
                ...state,
                xData: [
                    ...xData.slice(0, value),
                    ...xData.slice(value + 1)
                ],
                yData: yData.map(item => {
                    const { data } = item
                    const newData = [
                        ...data.slice(0, value),
                        ...data.slice(value + 1)
                    ]
                    return {
                        ...item,
                        data: newData,
                        error: lineChartErrorChecker(newData)
                    }
                })
            }
            break
        case typeChange.addLine:
            state = {
                ...state,
                yData: yData.concat({
                    name: "",
                    data: [...(new Array(xData.length))].map(() => ""),
                    color: defaultFieldColor
                })
            }
            break
        case typeChange.deleteLine:
            // value is index of line to be deleted
            state = {
                ...state,
                yData: [
                    ...yData.slice(0, value),
                    ...yData.slice(value + 1)
                ]
            }
            break
        case typeChange.xFieldChange:
            // value is index of the x field, options.value is value for it
            state = {
                ...state,
                xData: xData.map((itm, idx) => {
                    if (idx === value) {
                        return options?.value
                    }
                    return itm
                })
            }
            break
        case typeChange.yFieldChange:
            // value is index of line, options.index is index of y field, options.value is value for it
            state = {
                ...state,
                yData: yData.map((item, index) => {
                    if (value === index) {
                        const data = item.data.map((itm, idx) => {
                            if (idx === options?.index) {
                                return options.value
                            }
                            return itm
                        })
                        return {
                            ...item,
                            data,
                            error: lineChartErrorChecker(data)
                        }
                    }
                    return item
                })
            }
            break
        case typeChange.lineNameChange:
            // value is index, options.value is value for it
            state = {
                ...state,
                yData: yData.map((item, idex) => {
                    if (idex === value) {
                        return {
                            ...item,
                            name: options?.value
                        }
                    }
                    return item
                })
            }
            break
        case typeChange.colorChange:
            // value is line index, options.value is color for that line
            state = {
                ...state,
                yData: yData.map((item, idx) => {
                    if (idx === value) {
                        return {
                            ...item,
                            color: options?.value
                        }
                    }
                    return item
                })
            }
            break
        case typeChange.xLabelChange:
            // action.value is new value for X label
            state = { ...state, xLabel: value }
            break
        case typeChange.yLabelChange:
            // action.value is new value for Y label
            state = { ...state, yLabel: value }
            break

        default:
            break
    }

    return state
}
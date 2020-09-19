import { isRealNumber, defaultFieldColor } from "../../constants"
import { noAnyError, updateLocalState } from "../utils"


export interface LineChartState {
    chartTitle: string;
    xData: string[];
    xLabel?: string;
    yLabel?: string;
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
    const { type, value, options } = action
    const { xData, yData } = state

    let cloneYData = [...yData];
    let cloneXData = [...xData];

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
                xData: xData.filter((_, idx) => idx !== value),
                yData: yData.map(item => {
                    let data = item.data.filter((_, id) => id !== value)
                    return {
                        ...item,
                        data,
                        error: lineChartErrorChecker(data)
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
            state = { ...state, yData: yData.filter((_, idx) => idx !== value) }
            break
        case typeChange.xFieldChange:
            // value is index of the x field, options.value is value for it
            cloneXData[value] = options?.value
            state = { ...state, xData: cloneXData }
            break
        case typeChange.yFieldChange:
            // value is index of line, options.index is index of y field, options.value is value for it
            const cloneData = [...cloneYData[value].data]
            cloneData[options?.index] = options?.value

            cloneYData[value] = {
                ...cloneYData[value],
                data: cloneData,
                error: lineChartErrorChecker(cloneData)
            }
            state = { ...state, yData: cloneYData }
            break
        case typeChange.lineNameChange:
            // value is index, options.value is value for it
            cloneYData[value] = { ...cloneYData[value], name: options?.value }
            state = { ...state, yData: cloneYData }
            break
        case typeChange.colorChange:
            // value is line index, options.value is color for that line
            cloneYData[value] = { ...cloneYData[value], color: options?.value }
            state = { ...state, yData: cloneYData }
            break
        default:
            break
    }

    // check if there is no error, update local state
    if (noAnyError(yData.map(line => line.error))) {
        updateLocalState("lineChartState", state)
    }

    return state
}
import { ChartBaseState } from "../chart"
import { isRealNumber } from "../../constants";
import { noAnyError } from "../utils"


export enum typeChange {
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

export interface BarchartState extends ChartBaseState {
    chartTitle: string;
    xTitle: string;
    yTitle: string;
    xData: string[];
    yData: {
        error?: string;
        data: string[];
    }[];
}

export interface BarchartAction {
    type: typeChange;
    value?: any;
    options?: {
        index?: any;
        value?: any;
    };
}

export const MAX_BLOCKS_PER_CHART = 15, MAX_COLLUMS_PER_BLOCK = 5

type error = string | undefined
function barChartErrorChecker(data: string[]): error {
    return data.some(item => !isRealNumber.test(item)) ? "values need to be numbers" : undefined
}

export function barchartReducer(state: BarchartState, action: BarchartAction): BarchartState {
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
            if (xData.length < MAX_BLOCKS_PER_CHART) {
                xData = xData.concat("")
                yData = yData.concat({
                    data: [...(new Array(yData[0].data.length))].map(() => "")
                })
                newState = { ...newState, xData, yData }
            }
            break
        case typeChange.removeXFieldChange:
            // value will be the index to remove
            xData = xData.filter((_, idx) => idx !== value)
            yData = yData.filter((_, idx) => idx !== value)
            newState = { ...newState, xData, yData }
            break
        case typeChange.addYFieldChange:
            if (yData[0].data.length < MAX_COLLUMS_PER_BLOCK) {
                yData = yData.map(block => {
                    return {
                        ...block,
                        data: block.data.concat("")
                    }
                })
                newState = { ...newState, yData }
            }
            break
        case typeChange.removeYFieldChange:
            // index to remove will be hold in value
            yData = yData.map(block => {
                let data = block.data.filter((_, idx) => idx !== value)
                return {
                    ...block,
                    data,
                    error: barChartErrorChecker(data)
                }
            })
            newState = { ...newState, yData }
            break
        case typeChange.xFieldChange:
            // value is index of x field to update, options contains value for that field
            xData[value] = options?.value
            newState = { ...newState, xData }
            break
        case typeChange.yFieldChange:
            // value is index of y block, options.value is data for that, options.index is index of that field
            yData[value].data[options?.index] = options?.value
            let error = barChartErrorChecker(yData[value].data)
            yData[value].error = error

            newState = { ...newState, yData }
            break

        default:
            break
    }

    // final step to check errors:
    newState.allGood = noAnyError(newState.yData.map(block => block.error))

    return newState;
}
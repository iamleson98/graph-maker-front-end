import { isRealNumber, defaultFieldColor } from "../../constants";
import { noAnyError, updateLocalState } from "../utils"


export enum typeChange {
    chartTitleChange,
    xLabelChange,
    yLabelChange,
    xDataFieldChange,
    addXFieldChange,
    removeXFieldChange,
    addYFieldChange,
    removeYFieldChange,
    xFieldChange,
    yFieldChange,
    colorChange,
}

export interface BarchartState {
    chartTitle: string;
    xLabel: string;
    yLabel: string;
    xData: string[];
    colors: string[];
    yData: {
        error?: string;
        data: string[]; // when draw chart, we need to convert these strings to numbers
    }[];
}

// export const InitBarChartState: BarchartState = {
//     chartTitle: "",
//     xLabel: "",
//     yLabel: "",
//     xData: [""],
//     colors: [defaultFieldColor],
//     yData: [
//         {
//             error: undefined,
//             data: [""]
//         }
//     ]
// }

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
    // let newState = state;
    const { xData, yData, colors } = state
    const { type, value, options } = action

    switch (type) {
        case typeChange.chartTitleChange:
            state = { ...state, chartTitle: value }
            break
        case typeChange.xLabelChange:
            state = { ...state, xLabel: value }
            break
        case typeChange.yLabelChange:
            state = { ...state, yLabel: value }
            break
        case typeChange.xDataFieldChange:
            // value will be index, options.value will be value for that field
            xData[value] = options?.value
            state = { ...state, xData }
            break
        case typeChange.addXFieldChange:
            if (xData.length < MAX_BLOCKS_PER_CHART) {
                state = {
                    ...state,
                    xData: xData.concat(""),
                    yData: yData.concat({
                        data: [...(new Array(yData[0].data.length))].map(() => ""),
                        error: undefined
                    })
                }
            }
            break
        case typeChange.removeXFieldChange:
            // value will be the index to remove
            state = {
                ...state,
                xData: xData.filter((_, idx) => idx !== value),
                yData: yData.filter((_, idx) => idx !== value)
            }
            break
        case typeChange.addYFieldChange:
            if (yData[0].data.length < MAX_COLLUMS_PER_BLOCK) {
                state = {
                    ...state,
                    yData: yData.map(block => {
                        return {
                            ...block,
                            data: block.data.concat(""),
                        }
                    }),
                    colors: colors.concat(defaultFieldColor)
                }
            }
            break
        case typeChange.removeYFieldChange:
            // index to remove will be hold in value
            state = {
                ...state,
                yData: yData.map(block => {
                    let data = block.data.filter((_, idx) => idx !== value)
                    return {
                        ...block,
                        data,
                        error: barChartErrorChecker(data)
                    }
                }),
                colors: colors.filter((_, idx) => idx !== value)
            }
            break
        case typeChange.xFieldChange:
            // value is index of x field to update, options.value is new value for that field
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
            // value is index of y block, options.value is data for that, options.index is index of that field
            state = {
                ...state,
                yData: yData.map((block, blockIndex) => {
                    if (blockIndex === value) {
                        const data = block.data.map((dtItm, dtIdx) => {
                            if (dtIdx === options?.index) {
                                return options?.value
                            }
                            return dtItm
                        })
                        return {
                            error: barChartErrorChecker(data),
                            data,
                        }
                    }
                    return block
                })
            }
            break
        case typeChange.colorChange:
            // value is bar index, options.value is bar color value
            state = {
                ...state,
                colors: state.colors.map((itm, idx) => {
                    if (idx === value) {
                        return options?.value
                    }
                    return itm
                })
            }
            break

        default:
            break
    }

    // final step to check errors:
    if (noAnyError(state.yData.map(block => block.error))) {
        updateLocalState("barChartState", state)
    }

    return state;
}

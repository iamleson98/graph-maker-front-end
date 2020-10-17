import { isRealNumber, defaultFieldColor } from "../../../constants";


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
    yFieldValueChange,
    yFieldNameChange,
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
        name: string;
        value: string; // when draw chart, we need to convert these strings to numbers
    }[][];
}

export interface BarchartAction {
    type: typeChange;
    value?: any;
    options?: {
        index?: any;
        value?: any;
    };
}

export const MAX_BLOCKS_PER_CHART = 15, MAX_COLLUMS_PER_BLOCK = 4

type error = string | undefined
function barChartErrorChecker(data: string): error {
    return !isRealNumber.test(data) ? "values need to be numbers" : undefined
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
                const { length } = yData[0]
                state = {
                    ...state,
                    xData: xData.concat(""),
                    yData: [
                        ...yData,
                        [...new Array(length)].map((_, idx) => {
                            const { name } = yData[0][idx]
                            return {
                                name: name,
                                value: ""
                            }
                        })
                    ]
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
            if (yData[0].length < MAX_COLLUMS_PER_BLOCK) {
                state = {
                    ...state,
                    yData: yData.map(block => {
                        return block.concat({
                            name: "",
                            value: ""
                        })
                    }),
                    colors: colors.concat(defaultFieldColor)
                }
            }
            break
        case typeChange.removeYFieldChange:
            // value is index of bar to remove in each block
            state = {
                ...state,
                yData: yData.map(block => {
                    return block.filter((_, idx) => idx !== value)
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
        case typeChange.yFieldValueChange:
            // value is index of y block, options.value is data for that, options.index is index of that field
            state = {
                ...state,
                yData: yData.map((block, blockIndex) => {
                    if (blockIndex === value) {
                        return block.map((bar, barIndex) => {
                            if (barIndex === options?.index) {
                                return {
                                    ...bar,
                                    value: options?.value,
                                    error: barChartErrorChecker(options?.value)
                                }
                            }
                            return bar
                        })
                    }
                    return block
                })
            }
            break
        case typeChange.yFieldNameChange:
            // value is index of bar, options.value is data for that block
            state = {
                ...state,
                yData: yData.map(block => {
                    return block.map((bar, barIdx) => {
                        if (barIdx === value) {
                            return {
                                ...bar,
                                name: options?.value
                            }
                        }
                        return bar
                    })
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

    return state;
}

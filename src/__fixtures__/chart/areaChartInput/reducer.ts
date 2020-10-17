import { isRealNumber, defaultFieldColor } from "../../../constants";


export enum typeChange {
    chartTitle,
    xLabel,
    yLabel,
    xDataField,
    yDataField,
    color,
    areaName,
    deleteArea,
    addArea,
    addXField,
    deleteXField
}

export interface AreaChartState {
    chartTitle: string;
    xLabel: string;
    xData: string[];
    yLabel: string;
    yData: {
        color: string;
        name: string;
        data: string[];
        error?: string;
    }[];
}

export interface AreaChartAction {
    type: typeChange;
    value?: any;
    options?: {
        index?: number;
        value?: any;
    }
}

export const MAX_AREAS = 10, MAX_POINTS = 25

type error = string | undefined
function areaChartErrorChecker(data: string[]): error {
    return data.some(item => !isRealNumber.test(item)) ? "values need to be numbers" : undefined
}

export function areaChartReducer(state: AreaChartState, action: AreaChartAction): AreaChartState {
    const { type, value, options } = action
    const { xData, yData } = state

    switch (type) {
        case typeChange.chartTitle:
            return {
                ...state,
                chartTitle: value
            }
        case typeChange.xLabel:
            return {
                ...state,
                xLabel: value
            }
        case typeChange.yLabel:
            return {
                ...state,
                yLabel: value
            }
        case typeChange.color:
            // value is area index, options.value is color for that index
            return {
                ...state,
                yData: yData.map((item, idx) => {
                    return (idx === value) ?
                        {
                            ...item,
                            color: options?.value
                        } :
                        item
                })
            }
        case typeChange.areaName:
            // value is index, options.value is value for that
            return {
                ...state,
                yData: yData.map((item, idx) => {
                    return (idx === value) ?
                        {
                            ...item,
                            name: options?.value
                        } :
                        item
                })
            }
        case typeChange.xDataField:
            // value is index of x field, options.value is value for it
            return {
                ...state,
                xData: xData.map((item, idx) => {
                    return idx === value ? options?.value : item
                })
            }
        case typeChange.yDataField:
            // value is index of that area, options.index is  index of y field, options.value is new value for that
            return {
                ...state,
                yData: yData.map((item, idx) => {
                    if (idx === value) {
                        const data = item.data.map((itm, idx) => {
                            if (idx === options?.index) {
                                return options.value
                            }
                            return itm
                        })
                        return {
                            ...item,
                            data,
                            error: areaChartErrorChecker(data)
                        }
                    }
                    return item
                })
            }
        case typeChange.addArea:
            return {
                ...state,
                yData: yData.concat({
                    name: "",
                    data: [...(new Array(xData.length))].map(_ => ""),
                    color: defaultFieldColor
                })
            }
        case typeChange.addXField:
            if (xData.length < MAX_POINTS) {
                return {
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
            return state
        case typeChange.deleteXField:
            // value hold index of to be deleted field
            return {
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
                        error: areaChartErrorChecker(newData)
                    }
                })
            }

        default:
            return state
    }
}

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

export interface BarchartState {
    chartTitle: string;
    xTitle: string;
    yTitle: string;
    xData: string[];
    yData: string[][];
}

export interface BarchartAction {
    type: typeChange;
    value?: any;
    options?: {
        index?: any;
        value?: any;
    };
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
            if (xData.length <= 14) {
                let newYData = yData
                xData = xData.concat("")
                newYData.push(
                    [...(new Array(yData[0].length))].map(() => "") // since cannot concat an array to an array
                )
                newState = { ...newState, xData, yData: newYData }
            }
            break
        case typeChange.removeXFieldChange:
            // value will be the index to remove
            xData = xData.filter((_, idx) => idx !== value)
            yData = yData.filter((_, idx) => idx !== value)
            newState = { ...newState, xData, yData }
            break
        case typeChange.addYFieldChange:
            yData = yData.map(block => block.concat(""))
            newState = { ...newState, yData }
            break
        case typeChange.removeYFieldChange:
            // index to remove will be hold in option.value
            yData = yData.map(block => block.filter((_, idx) => idx !== value))
            newState = { ...newState, yData }
            break
        case typeChange.xFieldChange:
            // value is index of x field to update, options contains value for that field
            xData[value] = options?.value
            newState = { ...newState, xData }
            break
        case typeChange.yFieldChange:
            // value is index of y block, options.value is data for that, options.index is index of that field
            yData[value][options?.index] = options?.value
            newState = { ...newState, yData }
            break

        default:
            break
    }

    return newState;
}
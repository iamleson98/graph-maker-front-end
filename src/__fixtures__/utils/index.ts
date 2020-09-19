// import { BarchartState } from "../barChartInput/reducer"
import {
    // ChartType,
    localState
} from "../index"
import { localStateKey } from "../index"
// import { LineChartState } from "../lineChartInput/reducer"
// import { PieChartState } from "../pieChartInput/reducer"

export function noAnyError(errorList: any[]): boolean {
    return errorList.every(item => !item)
}

// type ValueType =
//     | ChartType
//     | BarchartState
//     | LineChartState
//     | PieChartState
//     | null

export function updateLocalState(key: localStateKey, value: any) { // objValue looks like this: { chartType: "Bar Chart" }, or similar
    const prevState = localState()
    localState({
        ...prevState,
        [key]: value
    })
}

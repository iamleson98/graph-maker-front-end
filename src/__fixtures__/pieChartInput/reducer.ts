import { isRealNumber } from '../../constants'
import { ChartBaseState } from '../chart'
import { noAnyError } from '../utils'

export enum typeChange {
    addPie,
    deletePie,
    titleChange,
    addSlice,
    deleteSlice,
    sliceNameChange,
    sliceValueChange,
}

export interface PieChartState extends ChartBaseState {
    chartTitle: string;
    pies: {
        name: string;
        value: string;
        error?: string;
    }[][];
}

export interface PieChartAction {
    type: typeChange;
    value?: any;
    options?: {
        index?: any;
        value?: any;
    };
}

// constants
export const MAX_SLICES_PER_PIE = 15, MAX_PIE = 4

export function pieChartReducer(state: PieChartState, action: PieChartAction): PieChartState {
    let newState = state
    let { pies } = state
    const { type, value, options } = action

    switch (type) {
        case typeChange.addPie:
            if (pieChartReducer.length < MAX_PIE) {
                const newPie = pies[0].map(pie => {
                    return { ...pie, value: "", error: undefined }
                })
                pies.push(newPie)
                newState = { ...newState, pies }
            }
            break
        case typeChange.deletePie:
            // value holds index of pie to remove
            pies = pies.filter((_, idx) => idx !== value)
            newState = { ...state, pies }
            break
        case typeChange.titleChange:
            newState = { ...newState, chartTitle: action.value }
            break
        case typeChange.addSlice:
            if (pies[0].length < MAX_SLICES_PER_PIE) {
                pies = pies.map(pie => {
                    return pie.concat({
                        name: "",
                        value: "",
                        error: undefined
                    })
                })
                newState = { ...newState, pies }
            }
            break
        case typeChange.deleteSlice:
            // value hold index to remove
            pies = pies.map(pie => {
                return pie.filter((_, id) => id !== value)
            })
            newState = { ...newState, pies }
            break
        case typeChange.sliceNameChange:
            // value is index, options.value is value
            pies = pies.map(pie => {
                return pie.map((slice, idx) => {
                    const { name } = slice
                    return {
                        ...slice,
                        name: idx === value ? options?.value : name,
                    }
                })
            })
            newState = { ...state, pies }
            break
        case typeChange.sliceValueChange:
            // value is index of pie to update, options.index is index of that slice, options.value is value for that field
            // check if the input value is a real number:
            let error = isRealNumber.test(options?.value) ? undefined : "value must be a number"
            pies[value][options?.index].error = error
            pies[value][options?.index].value = options?.value

            const allGood = noAnyError(
                pies
                    .map(pie => pie.map(slice => slice.error))
                    .reduce((a, b) => a.concat(b), [])
            )
            newState = { ...newState, pies, allGood }
            break

        default:
            break
    }

    return newState
}

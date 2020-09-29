import { isRealNumber, defaultFieldColor } from "../../constants"


export enum typeChange {
    addPie,
    deletePie,
    titleChange,
    addSlice,
    deleteSlice,
    sliceNameChange,
    sliceValueChange,
    colorChange
}

export interface PieChartState {
    chartTitle: string;
    pies: {
        color: string;
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
    const { pies } = state
    const { type, value, options } = action

    let clonePies = [...pies]

    switch (type) {
        case typeChange.addPie:
            if (pieChartReducer.length < MAX_PIE) {
                const newPie = clonePies[0].map(pie => {
                    return { ...pie, value: "", error: undefined }
                })
                clonePies.push(newPie) // only push can append an array to another array
                state = { ...state, pies: clonePies }
            }
            break
        case typeChange.deletePie:
            // value holds index of pie to remove
            state = { ...state, pies: clonePies.filter((_, idx) => idx !== value) }
            break
        case typeChange.titleChange:
            state = { ...state, chartTitle: action.value }
            break
        case typeChange.addSlice:
            if (pies[0].length < MAX_SLICES_PER_PIE) {
                state = {
                    ...state,
                    pies: clonePies.map(pie => {
                        return pie.concat({
                            name: "",
                            value: "",
                            error: undefined,
                            color: defaultFieldColor
                        })
                    })
                }
            }
            break
        case typeChange.deleteSlice:
            // value hold index to remove
            state = {
                ...state,
                pies: clonePies.map(pie => {
                    return pie.filter((_, id) => id !== value)
                })
            }
            break
        case typeChange.sliceNameChange:
            // value is index, options.value is value
            state = {
                ...state,
                pies: clonePies.map(pie => {
                    return pie.map((slice, idx) => {
                        const { name } = slice
                        return {
                            ...slice,
                            name: idx === value ? options?.value : name,
                        }
                    })
                })
            }
            break
        case typeChange.sliceValueChange:
            // value is index of pie to update, options.index is index of that slice, options.value is value for that slice
            // check if the input value is a real number:
            let error = isRealNumber.test(options?.value) ? undefined : "value must be a number"

            clonePies = clonePies.map((pie, pieIdx) => {
                if (value === pieIdx) {
                    return pie.map((slice, sliceIdx) => {
                        if (sliceIdx === options?.index) {
                            return { ...slice, error, value: options.value }
                        }
                        return slice
                    })
                }
                return pie
            })

            state = { ...state, pies: clonePies }
            break
        case typeChange.colorChange:
            // value is slice indexes, options.value is color for those slices
            clonePies = clonePies.map((pie) => {
                return pie.map((slice, sliceIndex) => {
                    if (sliceIndex === value) {
                        return { ...slice, color: options?.value }
                    }
                    return slice
                })
            })
            state = { ...state, pies: clonePies }
            break

        default:
            break
    }

    // if (noAnyError(
    //     clonePies
    //         .map(pie => pie.map(slice => slice.error))
    //         .reduce((a, b) => a.concat(b), [])
    // )) {
    //     updateLocalState("pieChartState", state)
    // }

    return state
}

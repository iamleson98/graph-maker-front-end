import { isRealNumber, defaultFieldColor } from "../../constants"


export enum typeChange {
    addPie,
    deletePie,
    titleChange,
    addSlice,
    deleteSlice,
    sliceNameChange,
    sliceValueChange,
    colorChange,
    pieNameChange,
}

export interface PieChartState {
    chartTitle: string;
    pies: {
        name: string;
        slices: {
            color: string;
            name: string;
            value: string;
            error?: string;
        }[]
    }[];
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
                state = {
                    ...state,
                    pies: clonePies.concat({
                        name: "",
                        slices: clonePies[0].slices.map(slice => {
                            return {
                                color: slice.color, // borrow color from the slice at this index of the first pie
                                name: slice.name, // borrow name from the slice at this index of the first pie
                                value: "",
                            }
                        })
                    })
                }
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
            if (pies[0].slices.length < MAX_SLICES_PER_PIE) {
                state = {
                    ...state,
                    pies: clonePies.map(pie => {
                        return {
                            ...pie,
                            slices: pie.slices.concat({
                                name: "",
                                value: "",
                                error: undefined,
                                color: defaultFieldColor
                            })
                        }
                    })
                }
            }
            break
        case typeChange.deleteSlice:
            // value hold index to remove
            state = {
                ...state,
                pies: clonePies.map(pie => {
                    return {
                        ...pie,
                        slices: pie.slices.filter((_, id) => id !== value)
                    }
                })
            }
            break
        case typeChange.sliceNameChange:
            // value is index, options.value is new name for that slice
            state = {
                ...state,
                pies: clonePies.map(pie => {
                    return {
                        ...pie,
                        slices: pie.slices.map((slice, idx) => {
                            const { name } = slice
                            return {
                                ...slice,
                                name: idx === value ? options?.value : name,
                            }
                        })
                    }
                })
            }
            break
        case typeChange.sliceValueChange:
            // value is index of pie to update, options.index is index of that slice, options.value is value for that slice
            // check if the input value is a real number:
            let error = isRealNumber.test(options?.value) ? undefined : "value must be a number"

            clonePies = clonePies.map((pie, pieIdx) => {
                if (value === pieIdx) {
                    return {
                        ...pie,
                        slices: pie.slices.map((slice, sliceIdx) => {
                            if (sliceIdx === options?.index) {
                                return { ...slice, error, value: options.value }
                            }
                            return slice
                        })
                    }
                }
                return pie
            })

            state = { ...state, pies: clonePies }
            break
        case typeChange.colorChange:
            // value is slice indexes, options.value is color for those slices
            clonePies = clonePies.map(pie => {
                return {
                    ...pie,
                    slices: pie.slices.map((slice, sliceIndex) => {
                        if (sliceIndex === value) {
                            return { ...slice, color: options?.value }
                        }
                        return slice
                    })
                }
            })
            state = { ...state, pies: clonePies }
            break

        case typeChange.pieNameChange:
            // value is pie index, options.value is new name for that pie
            clonePies = clonePies.map((pie, pieIndex) => {
                if (pieIndex === value) {
                    return {
                        ...pie,
                        name: options?.value
                    }
                }
                return pie
            })
            state = { ...state, pies: clonePies }
            break

        default:
            break
    }

    return state
}

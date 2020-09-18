import { localState } from "../index"
import { localStateKey } from "../index"

export function noAnyError(errorList: (string | undefined)[]): boolean {
    return errorList.every(item => !item)
}

export function updateLocalState(key: localStateKey, value: any) { // objValue looks like this: { chartType: "Bar Chart" }, or similar
    const prevState = localState()
    localState({
        ...prevState,
        [key]: value
    })
}

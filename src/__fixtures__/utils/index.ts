export function noAnyError(errorList: (string | undefined)[]): boolean {
    return errorList.every(item => item === undefined)
}

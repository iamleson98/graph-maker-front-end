// import { BarchartState } from "../barChartInput/reducer"
import {
    localState
} from "../index"
import { localStateKey } from "../index"
// import { LineChartState } from "../lineChartInput/reducer"
// import { PieChartState } from "../pieChartInput/reducer"


export function noAnyError(errorList: any[]): boolean {
    return errorList.every(item => !item)
}

export function updateLocalState(key: localStateKey, value: any) { // objValue looks like this: { chartType: "Bar Chart" }, or similar
    const prevState = localState()
    localState({
        ...prevState,
        [key]: value
    })
}

export function fileGenerator(data: string, filename: string, type: string) {
    var file = new Blob([data], { type });
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
            url = (URL || webkitURL).createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            (URL || webkitURL).revokeObjectURL(url);
        }, 0);
    }
}

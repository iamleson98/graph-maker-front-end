import { defaultFieldColor } from "../constants";
import { BarchartState } from "./barChartInput/reducer";
import { LineChartState } from "./lineChartInput/reducer";
import { PieChartState } from "./pieChartInput/reducer";


export const InitBarChartState: BarchartState = {
    chartTitle: "",
    xLabel: "",
    yLabel: "",
    xData: [""],
    colors: [defaultFieldColor],
    yData: [
        {
            error: undefined,
            data: [""]
        }
    ]
}

export const InitLineChartState: LineChartState = {
    chartTitle: "",
    xLabel: "",
    yLabel: "",
    xData: [""],
    yData: [
        {
            name: "",
            data: [""],
            color: defaultFieldColor
        }
    ]
}

export const InitPieChartState: PieChartState = {
    chartTitle: "",
    pies: [
        [
            {
                name: "",
                value: "",
                error: undefined,
                color: defaultFieldColor
            }
        ]
    ]
}

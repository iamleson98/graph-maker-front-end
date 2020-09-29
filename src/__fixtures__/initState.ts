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
        [
            {
                name: "",
                value: "",
                error: undefined
            }
        ]
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
        {
            slices: [
                {
                    name: "",
                    value: "1",
                    error: undefined,
                    color: defaultFieldColor
                }
            ],
            name: ""
        }
    ]
}

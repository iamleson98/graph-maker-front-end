import { defaultFieldColor } from "../constants";
import { AreaChartState } from "./chart/areaChartInput/reducer";
import { BarchartState } from "./chart/barChartInput/reducer";
import { LineChartState } from "./chart/lineChartInput/reducer";
import { PieChartState } from "./chart/pieChartInput/reducer";


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

export const InitAreaChartState: AreaChartState = {
    chartTitle: "",
    xData: [""],
    xLabel: "",
    yLabel: "",
    yData: [
        {
            name: "",
            data: [""],
            color: defaultFieldColor
        }
    ]
}

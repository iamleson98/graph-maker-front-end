import { ChartType } from "../__fixtures__"
import React from "react"


export const
    MAX_CHART_INPUT_HEIGHT = 550,
    isRealNumber = /^-?\d*\.?\d*$/ // this accepts real numbers

export interface KeyOfStringInterface {
    [key: string]: any
}

export type KeyOfChartType = {
    [key in ChartType]: React.MemoExoticComponent<() => JSX.Element>
}

export const defaultColors = [
    "rgb(244, 78, 59)",
    "rgb(254, 146, 0)",
    "rgb(104, 188, 0)",
    "rgb(250, 40, 255)",
    "rgb(128, 137, 0)",
    "rgb(196, 81, 0)",
    "rgb(0, 156, 224)"
], defaultFieldColor = defaultColors[0]

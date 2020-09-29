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
    "red", "orange", "yellow", "green", "blue", "brown", "purple"
],

    defaultFieldColor = "orange"

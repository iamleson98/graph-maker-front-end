import React, { memo, useMemo, useState } from "react"
import { PieChart, Timeline } from "@material-ui/icons"
import { ChartBar, Scatter, AreaChart } from "../../components/icons"
import Tooltip from "@material-ui/core/Tooltip"
import LineChartInput from "../lineChartInput"
import BarChartInput from "../barChartInput"
import PieChartInput from "../pieChartInput"
import SimpleBar from "simplebar-react"
import { DelayChartRender } from "./delayInputRender"
import { SvgIconTypeMap } from "@material-ui/core"
import { OverridableComponent } from "@material-ui/core/OverridableComponent"
import DummyChartInput from "../dummyInput/dummy"
import { ChartType } from "../index"
import { BarChartDrawer, LineChartDrawer, PieChartDrawer, ScatterChartDrawer, AreaChartDrawer } from "./chartDrawer"
import "simplebar/dist/simplebar.min.css"


function Chart() {

    // memoized values
    const chartRoutes = useMemo<{
        name: ChartType;
        icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
        tailwindColor: string;
        tailwindActiveBg: string;
        inputComponent: React.MemoExoticComponent<() => JSX.Element>;
        drawerComponent: React.MemoExoticComponent<() => JSX.Element>;
        afterBg: string;
    }[]>(() => {
        return [
            { name: "Bar chart", icon: ChartBar, tailwindColor: "text-green-500", tailwindActiveBg: "bg-green-200", inputComponent: BarChartInput, drawerComponent: BarChartDrawer, afterBg: "border-green-200" },
            { name: "Pie chart", icon: PieChart, tailwindColor: "text-red-500", tailwindActiveBg: "bg-red-200", inputComponent: PieChartInput, drawerComponent: PieChartDrawer, afterBg: "border-red-200" },
            { name: "Line chart", icon: Timeline, tailwindColor: "text-orange-500", tailwindActiveBg: "bg-orange-200", inputComponent: LineChartInput, drawerComponent: LineChartDrawer, afterBg: "border-orange-200" },
            { name: "Area chart", icon: AreaChart, tailwindColor: "text-purple-500", tailwindActiveBg: "bg-purple-200", inputComponent: DummyChartInput, drawerComponent: AreaChartDrawer, afterBg: "border-purple-200" },
            { name: "Scatter chart", icon: Scatter, tailwindColor: "text-blue-500", tailwindActiveBg: "bg-blue-200", inputComponent: DummyChartInput, drawerComponent: ScatterChartDrawer, afterBg: "border-blue-200" },
        ]
    }, [])

    // component state
    const [state, setState] = useState({
        activeIndex: 0,
    })
    const { activeIndex } = state

    const changeChart = (newIdx: number) => () => {

        if (newIdx !== activeIndex) {
            setState({
                ...state,
                activeIndex: newIdx
            })
        }
    }

    const CurrentDrawer = chartRoutes[activeIndex].drawerComponent

    return (
        <div className="rounded p-2 flex flex-wrap text-gray-600">
            {/* chart result */}
            <div className="sm:w-full w-8/12">
                <div className="p-1 text-sm font-medium">
                    {/* display type of chart */}
                    {chartRoutes[activeIndex].name}
                </div>
                <div className="p-1">
                    <div className="rounded p-1 bg-white flex flex-wrap justify-center">
                        {/* chart display area */}
                        <CurrentDrawer />
                    </div>
                </div>
            </div>

            {/* chart input field */}
            <div className="w-4/12 sm:w-full m-auto">
                <div className="p-1 text-sm font-medium">
                    Input data
                </div>
                <div className="p-1">
                    <div className="bg-white rounded p-1">
                        {/* chart input type switcher */}
                        <div className="flex items-center p-2 justify-around">
                            {chartRoutes.map((item, idx) => (
                                <Tooltip
                                    title={item.name}
                                    placement="top"
                                    key={idx}
                                >
                                    <div
                                        onClick={changeChart(idx)}
                                        className={`relative rounded h-8 flex flex-1 mr-1 items-center justify-center cursor-pointer transition-colors duration-200 ease-out hover:${item.tailwindActiveBg} ${activeIndex === idx ? item.tailwindActiveBg : ""}`}
                                    >
                                        <item.icon fontSize="small" className={item.tailwindColor} />
                                        {activeIndex === idx && <nav className={`absolute chart_nav_btn transform -translate-x-1/2 border-4 ${item.afterBg}`}></nav>}
                                    </div>
                                </Tooltip>
                            ))}
                        </div>
                        <SimpleBar
                            style={{
                                height: 450
                            }}
                            className="p-1"
                        >
                            {chartRoutes.map((item, idx) => (
                                <React.Fragment key={idx}>
                                    {activeIndex === idx && (
                                        <DelayChartRender>
                                            <item.inputComponent />
                                        </DelayChartRender>
                                    )}
                                </React.Fragment>
                            ))}
                        </SimpleBar>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Chart)

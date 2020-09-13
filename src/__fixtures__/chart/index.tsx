import React, { memo, useMemo, useState, useRef } from "react"
import { PieChart, Timeline } from "@material-ui/icons"
import { ChartBar, Scatter, AreaChart } from "../../components/icons"
import Tooltip from "@material-ui/core/Tooltip"
import LineChartInput from "../lineChartInput"
import BarChartInput from "../barChartInput"
import PieChartInput from "../pieChartInput"
import SimpleBar from "simplebar-react"
import "simplebar/dist/simplebar.min.css"
import { DelayChartRender } from "./delayInputRender"
import { Button, SvgIconTypeMap } from "@material-ui/core"
// import StdPieChart from "../standardChart/pie"
// import StdLineChart from "../standardChart/line"
import StdBarChart from "../standardChart/bar"
import { BarchartState } from "../barChartInput/reducer"
import { PieChartState } from "../pieChartInput/reducer"
import { LineChartState } from "../lineChartInput/reducer"
import { KeyOfStringInterface } from "../../constants"
import { OverridableComponent } from "@material-ui/core/OverridableComponent"
import DummyChartInput from "../dummyInput/dummy"
// import { useQuery } from "@apollo/client"
// import { CHECK_CHART_DRAW_BUTTON_CAN_ACTIVE } from "../../graphql/queries"


interface ChartRef extends KeyOfStringInterface {
    barChartState?: BarchartState;
    pieChartState?: PieChartState;
    lineChartState?: LineChartState;
    scatterChartState?: any;
    areaChartState?: any;
}

type chartRefKey = "barChartState" | "pieChartState" | "lineChartState" | "scatterChartState" | "areaChartState";

export interface ChartBaseState {
    allGood: boolean; // to know whether user can click draw button
}

function Chart() {

    // query to determine if the draw button is clickable
    // const { loading, data } = useQuery(CHECK_CHART_DRAW_BUTTON_CAN_ACTIVE)
    const loading = false

    // references
    const reference = useRef<ChartRef>({
        barChartState: undefined,
        pieChartState: undefined,
        lineChartState: undefined,
        areaChartState: undefined,
        scatterChartState: undefined
    })

    // memoized values
    const chartRoutes = useMemo<{
        name: string;
        icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
        tailwindColor: string;
        tailwindActiveBg: string;
        refKey: chartRefKey;
        inputComponent: React.MemoExoticComponent<() => JSX.Element>;
    }[]>(() => {
        return [
            { name: "Bar chart", icon: ChartBar, tailwindColor: "text-green-500", tailwindActiveBg: "bg-green-100", refKey: "barChartState", inputComponent: BarChartInput },
            { name: "Pie chart", icon: PieChart, tailwindColor: "text-red-500", tailwindActiveBg: "bg-red-100", refKey: "pieChartState", inputComponent: PieChartInput },
            { name: "Line chart", icon: Timeline, tailwindColor: "text-orange-500", tailwindActiveBg: "bg-orange-100", refKey: "lineChartState", inputComponent: LineChartInput },
            { name: "Area chart", icon: AreaChart, tailwindColor: "text-purple-500", tailwindActiveBg: "bg-purple-100", refKey: "areaChartState", inputComponent: DummyChartInput },
            { name: "Scatter chart", icon: Scatter, tailwindColor: "text-blue-500", tailwindActiveBg: "bg-blue-100", refKey: "scatterChartState", inputComponent: DummyChartInput },
        ]
    }, [])

    // component state
    const [state, setState] = useState({
        activeIndex: 0
    })
    const { activeIndex } = state

    const log = (key: chartRefKey) => {
        console.log(reference.current[key])
    }

    const changeChart = (newIdx: number) => () => {
        if (newIdx !== activeIndex) {
            setState({ ...state, activeIndex: newIdx })
        }
    }

    return (
        <div className="rounded p-2 flex flex-wrap">
            {/* chart result */}
            <div className="w-8/12 sm:w-full">
                <div className="p-1">
                    <div className="rounded bg-white font-medium p-2 text-gray-700">
                        {chartRoutes[activeIndex].name}
                    </div>
                </div>
                <div className="p-1">
                    <div className="rounded bg-white p-1 flex flex-wrap justify-center">
                        <StdBarChart
                            xLabels={["one", "two", "three", "four", "one", "two", "three", "four"]}
                            yDataList={[
                                {
                                    data: [1, 60, 24, 6, 12, 54, 10, 22],
                                    label: "Android"
                                },
                                {
                                    data: [6, 2, 6, 13, 78, 90, 4, 20],
                                    label: "IOS"
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>

            {/* chart input field */}
            <div className="w-4/12 sm:w-full max-w-xs m-auto">
                <div className="p-1">
                    <div className="bg-white rounded">
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
                                        className={`rounded h-8 flex flex-1 mr-1 items-center justify-center cursor-pointer transition-colors duration-200 ease-out hover:${item.tailwindActiveBg} ${activeIndex === idx ? item.tailwindActiveBg : ""}`}
                                    >
                                        <item.icon fontSize="small" className={item.tailwindColor} />
                                    </div>
                                </Tooltip>
                            ))}
                        </div>
                        <SimpleBar
                            style={{
                                height: 450
                            }}
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
                        <div className="p-2 sm:fixed bg-white sm:w-full sm:bottom-0 sm:left-0">
                            <Button
                                color="primary"
                                variant="contained"
                                className="focus:outline-none"
                                disableElevation={true}
                                fullWidth={true}
                                onClick={() => log(chartRoutes[activeIndex].refKey)}
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Draw chart"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Chart)

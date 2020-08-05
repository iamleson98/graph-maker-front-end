import React, { memo, useMemo, useState, useRef } from 'react'
import { PieChart, Timeline } from '@material-ui/icons'
import { ChartBar, Scatter, AreaChart } from '../../components/icons'
import Tooltip from '@material-ui/core/Tooltip'
import LineChartInput from '../lineChartInput'
import BarChartInput from '../barChartInput'
import PieChartInput from '../pieChartInput'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { DelayChartRender } from './delayInputRender'
import { Button, SvgIconTypeMap } from '@material-ui/core'
import Example from '../standardChart/pie'
import { BarchartState } from '../barChartInput/reducer'
import { PieChartState } from '../pieChartInput/reducer'
import { LineChartState } from '../lineChartInput/reducer'
import { KeyOfStringInterface } from '../constants'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'
import Dummy from './dummy'


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

    // references
    const reference = useRef<ChartRef>({
        barChartState: undefined,
        pieChartState: undefined,
        lineChartState: undefined,
        areaChartState: undefined,
        scatterChartState: undefined
    })

    // memoized values
    const chartButtons = useMemo<{
        name: string;
        icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
        tailwindColor: string;
        tailwindActiveBg: string;
        refKey: chartRefKey;
        inputComponent: React.MemoExoticComponent<(param: { giveState: (state: any) => void }) => JSX.Element>;
    }[]>(() => {
        return [
            { name: "Bar chart", icon: ChartBar, tailwindColor: "text-green-500", tailwindActiveBg: "bg-green-200", refKey: "barChartState", inputComponent: BarChartInput },
            { name: "Pie chart", icon: PieChart, tailwindColor: "text-red-500", tailwindActiveBg: "bg-red-200", refKey: "pieChartState", inputComponent: PieChartInput },
            { name: "Line chart", icon: Timeline, tailwindColor: "text-orange-500", tailwindActiveBg: "bg-orange-200", refKey: "lineChartState", inputComponent: LineChartInput },
            { name: "Area chart", icon: AreaChart, tailwindColor: "text-purple-500", tailwindActiveBg: "bg-purple-200", refKey: "areaChartState", inputComponent: Dummy },
            { name: "Scatter chart", icon: Scatter, tailwindColor: "text-blue-500", tailwindActiveBg: "bg-blue-200", refKey: "scatterChartState", inputComponent: Dummy },
        ]
    }, [])

    // component state
    const [state, setState] = useState({
        activeIndex: 0
    })
    const { activeIndex } = state

    // After a chart input was updated, this will be called
    const setChartState = (type: chartRefKey) => (value: any) => {
        reference.current[type] = value
        setState({ ...state })
    }

    console.log("hi")

    const log = (key: chartRefKey) => {
        console.log(reference.current[key])
    }

    return (
        <div className="rounded p-2 flex flex-wrap">
            <div className="w-8/12 sm:w-full">
                <div className="p-1">
                    <div className="rounded bg-white p-2 text-gray-600">
                        {chartButtons[activeIndex].name}
                    </div>
                </div>
                <div className="p-1">
                    <div className="rounded bg-white p-1">
                        <Example />
                    </div>
                </div>
            </div>
            <div className="w-4/12 sm:w-full max-w-xs m-auto">
                <div className="p-1">
                    <div className="bg-white rounded">
                        <div className="flex items-center p-2 justify-around">
                            {chartButtons.map((item, idx) => (
                                <Tooltip
                                    title={item.name}
                                    placement="top"
                                    key={idx}
                                >
                                    <div
                                        onClick={() => {
                                            if (idx !== activeIndex) {
                                                setState({ ...state, activeIndex: idx })
                                            }
                                        }}
                                        className={`rounded h-8 flex flex-1 mr-1 items-center justify-center cursor-pointer transition-colors duration-200 ease-out hover:${item.tailwindActiveBg} ${activeIndex === idx ? item.tailwindActiveBg : ""}`}
                                    >
                                        <item.icon fontSize="small" className={item.tailwindColor} />
                                    </div>
                                </Tooltip>
                            ))}
                        </div>
                        <SimpleBar
                            style={{
                                height: 480
                            }}
                        >
                            {chartButtons.map((item, idx) => (
                                <React.Fragment key={idx}>
                                    {activeIndex === idx && (
                                        <DelayChartRender>
                                            <item.inputComponent
                                                giveState={setChartState(item.refKey)}
                                            />
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
                                onClick={() => log(chartButtons[activeIndex].refKey)}
                                disabled={!!reference.current[chartButtons[activeIndex].refKey]?.allGood}
                            >
                                Draw chart
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Chart)

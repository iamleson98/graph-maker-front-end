import React, { memo, useMemo, useState } from 'react'
import { PieChart, Timeline } from '@material-ui/icons'
import { ChartBar, Scatter, AreaChart } from '../../components/icons'
import Tooltip from '@material-ui/core/Tooltip'
import LineChartInput from '../lineChartInput'
import BarChartInput from '../barChartInput'
import PieChartInput from '../pieChartInput'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { CustomChartRender } from './delayInputRender'
import { Button } from '@material-ui/core'
import Example from '../standardChart/pie'


function Chart() {

    // memoized values
    const chartDefs = useMemo(() => {
        return [
            { name: "Bar chart", icon: ChartBar, tailwindColor: "text-green-500", tailwindActiveBg: "bg-green-200" },
            { name: "Pie chart", icon: PieChart, tailwindColor: "text-red-500", tailwindActiveBg: "bg-red-200" },
            { name: "Line chart", icon: Timeline, tailwindColor: "text-orange-500", tailwindActiveBg: "bg-orange-200" },
            { name: "Area chart", icon: AreaChart, tailwindColor: "text-purple-500", tailwindActiveBg: "bg-purple-200" },
            { name: "Scatter chart", icon: Scatter, tailwindColor: "text-blue-500", tailwindActiveBg: "bg-blue-200" },
        ]
    }, [])

    // component state
    const [state, setState] = useState({
        activeIndex: 0
    })
    const { activeIndex } = state

    return (
        <div className="rounded p-2 flex flex-wrap">
            <div className="w-8/12 sm:w-full">
                <div className="p-1">
                    <div className="rounded bg-white p-2 text-gray-600">
                        {chartDefs[activeIndex].name}
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
                            {chartDefs.map((item, idx) => (
                                <Tooltip
                                    title={item.name}
                                    placement="top"
                                    key={idx}
                                >
                                    <div
                                        onClick={() => setState({ ...state, activeIndex: idx })}
                                        className={`rounded h-8 flex flex-1 mr-1 items-center justify-center cursor-pointer hover:${item.tailwindActiveBg} ${activeIndex === idx ? item.tailwindActiveBg : ""}`}
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
                            {activeIndex === 0 && (
                                <CustomChartRender>
                                    <BarChartInput />
                                </CustomChartRender>
                            )}
                            {activeIndex === 1 && (
                                <CustomChartRender>
                                    <PieChartInput />
                                </CustomChartRender>
                            )}
                            {activeIndex === 2 && (
                                <CustomChartRender>
                                    <LineChartInput />
                                </CustomChartRender>
                            )}
                        </SimpleBar>
                        <div className="p-2">
                            <Button
                                size="small"
                                color="primary"
                                variant="contained"
                                className="focus:outline-none"
                                disableElevation={true}
                                fullWidth={true}
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

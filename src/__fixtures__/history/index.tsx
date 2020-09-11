import React, { memo, useRef, useState } from "react"
import { FilterList, KeyboardArrowDown } from "@material-ui/icons"
import Menu from "../menu"
import ClickAwayListener from "@material-ui/core/ClickAwayListener"
import ChartCard from "../chartCard"


const fakes = [
    {
        img: "https://docs.mongodb.com/charts/master/_images/stacked-bar-chart-reference-small.png",
        title: "This is the chart and do you like ?",
        timestamp: new Date().toString()
    },
    {
        img: "https://docs.mongodb.com/charts/master/_images/stacked-bar-chart-reference-small.png",
        title: "This is the chart and do you like ?",
        timestamp: new Date().toString()
    }, {
        img: "https://docs.mongodb.com/charts/master/_images/stacked-bar-chart-reference-small.png",
        title: "This is the chart and do you like ?",
        timestamp: new Date().toString()
    }, {
        img: "https://docs.mongodb.com/charts/master/_images/stacked-bar-chart-reference-small.png",
        title: "This is the chart and do you like ?",
        timestamp: new Date().toString()
    }, {
        img: "https://docs.mongodb.com/charts/master/_images/stacked-bar-chart-reference-small.png",
        title: "This is the chart and do you like ?",
        timestamp: new Date().toString()
    }, {
        img: "https://docs.mongodb.com/charts/master/_images/stacked-bar-chart-reference-small.png",
        title: "This is the chart and do you like ?",
        timestamp: new Date().toString()
    }, {
        img: "https://docs.mongodb.com/charts/master/_images/stacked-bar-chart-reference-small.png",
        title: "This is the chart and do you like ?",
        timestamp: new Date().toString()
    }, {
        img: "https://docs.mongodb.com/charts/master/_images/stacked-bar-chart-reference-small.png",
        title: "This is the chart and do you like ?",
        timestamp: new Date().toString()
    },
]


function History() {

    // references
    const dateFilterRef = useRef()
    const chartFilterRef = useRef()

    // component state
    const [state, setState] = useState({
        dateFilter: "",
        chartFilter: ""
    })

    const filters = [
        {
            name: "date",
            menuList: ["old first", "new first"],
            ref: dateFilterRef,
            stateKey: "dateFilter"
        },
        {
            name: "chart type",
            menuList: ["Pie", "Line", "Area", "Bar"],
            ref: chartFilterRef,
            stateKey: "chartFilter"
        }
    ]

    const toggleMenu = (ref: React.MutableRefObject<any>, act: "close" | "open") => {
        (ref.current as HTMLElement).classList[act === "open" ? "remove" : "add"]("hidden")
    }

    const setFilterTypes = (stateKey: string) => (value: string) => {
        setState({
            ...state,
            [stateKey]: value
        })
    }

    return (
        <div className="p-4 rounded bg-white text-gray-700">
            <p className="text-base font-medium mb-4">Collection</p>

            {/* filter */}
            <div className="flex items-center text-gray-600 mb-3">
                <div className="mr-3 text-sm flex items-center">
                    <FilterList fontSize="small" /> <span>Filter</span>
                </div>
                {filters.map((filter, idx) => (
                    <div
                        key={idx}
                        className="bg-gray-200 hover:bg-gray-300 transition-colors duration-200 cursor-pointer rounded mr-3 relative"
                    >
                        <ClickAwayListener
                            onClickAway={() => toggleMenu(filter.ref, "close")}
                        >
                            <div
                                className="flex items-center px-2 py-1"
                                onClick={() => toggleMenu(filter.ref, "open")}
                            >
                                <span className="mr-2">{filter.name}</span>
                                <KeyboardArrowDown fontSize="small" />
                            </div>
                        </ClickAwayListener>
                        <Menu
                            refer={filter.ref}
                            addClass="top-full w-full hidden"
                            values={filter.menuList}
                            giveValue={setFilterTypes(filter.stateKey)}
                        />
                    </div>
                ))}
            </div>
            {/* charts */}
            <div className="flex flex-wrap">
                {fakes.map((item, idx) => (
                    <ChartCard
                        key={idx}
                        title={item.title}
                        timestamp={item.timestamp}
                        img={item.img}
                    />
                ))}
            </div>
        </div>
    )
}

export default memo(History)

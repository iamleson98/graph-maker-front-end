import React, { memo, useRef, useState } from "react"
import { FilterList, KeyboardArrowDown } from "@material-ui/icons"
import Menu from "../menu"
import ClickAwayListener from "@material-ui/core/ClickAwayListener"
import ChartCard from "../chartCard"
import { useTranslation } from "react-i18next"
import { KeyOfStringInterface } from "../../constants"


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
    }
]


function History() {

    // references
    const dateFilterMenuRef = useRef()
    const chartFilterMenuRef = useRef()

    // trans
    const { t } = useTranslation()

    // component state
    const [state, setState] = useState({
        dateFilter: "latest_first",
        chartFilter: "",

        curDateFilterDispl: "",
        curChartTypeFilterDispl: ""
    })
    const { curChartTypeFilterDispl, curDateFilterDispl } = state

    const dateFilterMap: KeyOfStringInterface = {
        "collection.filterDate.olderFirst": "older_first",
        "collection.filterDate.latestFirst": "latest_first"
    }

    const chartTypeMap: KeyOfStringInterface = {
        "chartType.pie": "pie",
        "chartType.line": "line",
        "chartType.bar": "bar",
        "chartType.scatter": "scatter",
        "chartType.area": "area",
    }

    const menuFilters = [
        {
            placeholder: t("collection.filterDate.placeholder"),
            curDisplay: curDateFilterDispl,
            menuList: Object.keys(dateFilterMap).map(item => {
                return {
                    display: t(item),
                    returnVal: item
                }
            }),
            ref: dateFilterMenuRef,
            stateKey: "dateFilter"
        },
        {
            placeholder: t("collection.filterChartType.placeholder"),
            curDisplay: curChartTypeFilterDispl,
            menuList: Object.keys(chartTypeMap).map(item => {
                return {
                    display: t(item),
                    returnVal: item
                }
            }),
            ref: chartFilterMenuRef,
            stateKey: "chartFilter"
        }
    ]

    const toggleMenu = (ref: React.MutableRefObject<any>, act: "close" | "open") => {
        (ref.current as HTMLElement).classList[act === "open" ? "remove" : "add"]("hidden")
    }

    const setFilterTypes = (stateKey: string) => (value: string) => {
        // stateKey is either "dateFilter" or "chartFilter"
        setState({
            ...state,
            [stateKey]: dateFilterMap[value] || chartTypeMap[value], // stateKey is used as key here, so it must be exactly the same
            [stateKey === "dateFilter" ? "curDateFilterDispl" : "curChartTypeFilterDispl"]: value
        })
    }

    return (
        <div className="p-4 rounded bg-white text-gray-700">
            <p className="text-base font-medium mb-4">
                {t("collection.collection")}
            </p>

            {/* filter */}
            <div className="flex items-center text-gray-600 mb-3">
                <div className="mr-3 text-sm xs:text-xs flex items-center text-red-500 font-medium">
                    <FilterList fontSize="small" />
                    <span>{t("collection.filter")}</span>
                </div>
                {menuFilters.map((filter, idx) => (
                    <div
                        key={idx}
                        className="bg-gray-200 hover:bg-gray-300 transition-colors duration-200 cursor-pointer rounded mr-2 relative"
                    >
                        <ClickAwayListener
                            onClickAway={() => toggleMenu(filter.ref, "close")}
                        >
                            <div
                                className="flex xs:text-sm whitespace-no-wrap items-center px-2 py-1"
                                onClick={() => toggleMenu(filter.ref, "open")}
                            >
                                <span className="mr-1">
                                    {t(filter.curDisplay) || filter.placeholder}
                                </span>
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

import React, { memo, useRef, useState } from "react"
import { FilterList, KeyboardArrowDown } from "@material-ui/icons"
import Menu from "../menu"
import ClickAwayListener from "@material-ui/core/ClickAwayListener"
import ChartCard from "../chartCard"
import { useTranslation } from "react-i18next"


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
        dateFilter: "",
        chartFilter: "",
    })
    const { dateFilter, chartFilter } = state

    const filters = [
        {
            placeholder: t("collection.filterDate.placeholder"),
            value: dateFilter,
            menuList: [
                {
                    display: t("collection.filterDate.olderFirst"),
                    returnVal: "older_first"
                },
                {
                    display: t("collection.filterDate.latestFirst"),
                    returnVal: "latest_first"
                }
            ],
            ref: dateFilterMenuRef,
            stateKey: "dateFilter"
        },
        {
            placeholder: t("collection.filterChartType.placeholder"),
            value: chartFilter,
            menuList: [
                {
                    display: t("chartType.pie"),
                    returnVal: "pie"
                },
                {
                    display: t("chartType.line"),
                    returnVal: "line"
                },
                {
                    display: t("chartType.area"),
                    returnVal: "area"
                },
                {
                    display: t("chartType.bar"),
                    returnVal: "bar"
                },
                {
                    display: t("chartType.scatter"),
                    returnVal: "scatter"
                }
            ],
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
            [stateKey]: value // stateKey is used as key here, so it must be exactly the same
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
                {filters.map((filter, idx) => (
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
                                    {filter.value || filter.placeholder}
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

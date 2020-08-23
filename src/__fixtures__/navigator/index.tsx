import React, { memo, useState } from "react"
import { ArrowDropDown } from "@material-ui/icons"
import ClickAwayListener from "@material-ui/core/ClickAwayListener"


function Navigator() {

    // component state
    const [state, setState] = useState({
        activeTab: 0,
    })

    const navigators = [
        { // 0
            name: "Chart",
            href: "/chart"
        },
        { // 1
            name: "Temperature",
            href: "/temperature"
        },
        { // 2
            name: "About",
            href: "/about"
        },
        { // 3
            name: "Q & A",
            href: "/qa"
        }
    ];

    function clickHandler(key: number) {
        // console.log(key)
        if (key !== state.activeTab) {
            setState({ activeTab: key })
        }
    }

    function toggleMenu(type: "open" | "close") {
        var menu = document.getElementById("menu") as HTMLDivElement
        menu.classList[type === "open" ? "remove" : "add"]("hidden")
    }

    return (
        <div className="flex flex-no-wrap">
            <div>
                {navigators.map(function (nav, idx) {
                    return (
                        <a
                            href={"#j"}
                            onClick={() => clickHandler(idx)}
                            key={idx}
                            className={`text-gray-600 cursor-pointer text-lg font-medium leading-5 float-left px-2 py-2 ${state.activeTab === idx ? "text-blue-700 border-solid border-b-2 border-blue-700" : "hover:text-gray-500 transition-colors duration-200"}`}
                        >
                            {nav.name}
                        </a>
                    )
                })}
            </div>

            <ClickAwayListener onClickAway={() => toggleMenu("close")}>
                <div className="relative">
                    <div className="flex items-center cursor-pointer" onClick={() => toggleMenu("open")}>
                        <div className="border-2 border-solid rounded-full border-gray-200 overflow-hidden w-8 h-8 text-center mr-2">
                            <img src="https://upload.wikimedia.org/wikipedia/vi/thumb/b/b0/Avatar-Teaser-Poster.jpg/220px-Avatar-Teaser-Poster.jpg" alt="Phuc nguyen" />
                        </div>
                        <div className="flex items-center text-gray-600">
                            <span className="mr-2 text-base leading-5">Nguyen Van Phuc</span>
                            <ArrowDropDown fontSize="small" />
                        </div>
                    </div>
                    <div id="menu" className="absolute left-0 transform translate-y-full rounded bg-white shadow hidden">
                        <p className="py-2 px-3 text-sm font-normal text-gray-600">
                            Sign out
                        </p>
                        <p className="py-2 px-3 text-sm font-normal text-gray-600">
                            Setting
                        </p>
                    </div>
                </div>
            </ClickAwayListener>
        </div>
    )
}

export default memo(Navigator)

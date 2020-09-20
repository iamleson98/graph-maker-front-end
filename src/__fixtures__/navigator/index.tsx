import React, { memo, useRef, useState } from "react"
import { ArrowDropDown } from "@material-ui/icons"
import ClickAwayListener from "@material-ui/core/ClickAwayListener"
import Menu from "../menu"
import Logo from "../../components/logo"


function Navigator() {

    // ref
    const menuRef = useRef<any>()

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
        if (key !== state.activeTab) {
            setState({ activeTab: key })
        }
    }

    function toggleMenu(type: "open" | "close") {
        (menuRef.current as HTMLElement).classList[type === "open" ? "remove" : "add"]("hidden")
    }

    return (
        <div className="flex flex-no-wrap items-center py-1 bg-white px-4 fixed top-0 left-0 w-full z-20 shadow-xs justify-between">
            <a href="/">
                <Logo />
            </a>
            <div className="flex items-center">
                <div className="mr-5">
                    {navigators.map((nav, idx) => {
                        return (
                            <a
                                href={"#j"}
                                onClick={() => clickHandler(idx)}
                                key={idx}
                                className={`text-gray-700 inline cursor-pointer text-sm font-medium leading-5 float-left px-2 py-2 ${state.activeTab === idx ? "text-blue-700" : "hover:text-gray-600 transition-colors duration-200"}`}
                            >
                                {nav.name}
                            </a>
                        )
                    })}
                </div>
                <div className="relative">
                    <ClickAwayListener onClickAway={() => toggleMenu("close")}>
                        <div className="flex items-center cursor-pointer" onClick={() => toggleMenu("open")}>
                            <div className="border-2 border-solid rounded-full border-gray-200 flex-shrink-0 overflow-hidden w-8 h-8 text-center mr-2">
                                <img src="https://upload.wikimedia.org/wikipedia/vi/thumb/b/b0/Avatar-Teaser-Poster.jpg/220px-Avatar-Teaser-Poster.jpg" alt="Phuc nguyen" />
                            </div>
                            <div className="flex items-center text-gray-600">
                                <span className="mr-2 text-sm leading-5">Nguyen Van Phuc</span>
                                <ArrowDropDown fontSize="small" />
                            </div>
                        </div>
                    </ClickAwayListener>
                    <Menu
                        addClass="hidden w-full top-full"
                        values={["Sign out", "Setting"]}
                        giveValue={console.log}
                        refer={menuRef}
                    />
                </div>
            </div>
        </div>
    )
}

export default memo(Navigator)

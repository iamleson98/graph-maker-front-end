import { DeleteOutlined, MoreHoriz, Schedule } from "@material-ui/icons"
import React, { memo, useRef } from "react"
import dayjs from "dayjs"
import { ClickAwayListener } from "@material-ui/core"
import { useTranslation } from "react-i18next"


export interface ChartCardProps {
    img: string;
    title: string;
    timestamp: string;
}

function ChartCard({ img, title, timestamp }: ChartCardProps) {

    // trans
    const { t } = useTranslation()

    const deleteRef = useRef<any>()

    const toggleDelete = (act: "open" | "close") => () => {
        (deleteRef.current as HTMLElement).style.display = act === "open" ? "flex" : "none"
    }

    return (
        <div className="bg-white transition-shadow hover:shadow-lg duration-200 text-gray-700 max-w-xs mr-2 mb-2">
            {/* chart image */}
            <div
                style={{
                    backgroundImage: `url(${img})`,
                }}
                className="bg-no-repeat bg-center bg-contain h-48 xs:h-40 rounded"
            >
            </div>
            {/* meta */}
            <div className="bg-gray-300 flex items-center justify-between py-1 px-2 rounded">
                <div className="mr-2">
                    <p className="font-medium text-base xs:text-sm cursor-pointer">
                        {`${title.slice(0, 25)}...`}
                    </p>
                    <p className="text-xs flex items-center">
                        <Schedule fontSize="inherit" className="mr-1" />
                        {/* refer to https://day.js.org/docs/en/display/format#list-of-localized-formats */}
                        <span className="text-gray-600">{dayjs(timestamp).format("MMM D, YYYY")}</span>
                    </p>
                </div>
                <ClickAwayListener onClickAway={toggleDelete("close")}>
                    <div className="relative h-6 w-6 flex items-center justify-center">
                        <div className="cursor-pointer h-full w-full" title="Action"
                            onClick={toggleDelete("open")}
                        >
                            <MoreHoriz />
                        </div>
                        <div
                            ref={deleteRef}
                            className="absolute cursor-pointer hidden hover:bg-red-200 transition-colors duration-200 transform -translate-y-full shadow py-1 px-2 items-center justify-center bg-red-100 rounded z-10 text-red-500 text-xs"
                        >
                            <DeleteOutlined className="mr-1" />
                            <span>
                                {t("delete")}
                            </span>
                        </div>
                    </div>
                </ClickAwayListener>
            </div>
        </div>
    )
}

export default memo(ChartCard)

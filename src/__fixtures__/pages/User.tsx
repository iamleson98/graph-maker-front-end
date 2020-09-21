import React, { memo } from "react"
import UserInfo from "../userInfo"
import ChartHistory from "../history"


function UserPage() {
    return (
        <div className="flex flex-no-wrap sm:flex-wrap">
            <div className="w-1/3 sm:w-full p-1">
                <UserInfo />
            </div>
            <div className="w-2/3 sm:w-full p-1">
                <ChartHistory />
            </div>
        </div>
    )
}

export default memo(UserPage)

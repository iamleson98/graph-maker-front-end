import React, { memo } from "react"
import UserInfo from "../userInfo"
import ChartHistory from "../history"
import { Helmet } from "react-helmet"


function UserPage() {
    return (
        <div className="flex flex-no-wrap sm:flex-wrap">
            <Helmet>
                <title>
                    My profile
                </title>
            </Helmet>
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

import React, { memo } from "react"
import { Helmet } from "react-helmet"


function Weather() {
    return (
        <div>
            <Helmet>
                <title>
                    Weather
                </title>
            </Helmet>
            <div>
                weather page
            </div>
        </div>
    )
}

export default memo(Weather)

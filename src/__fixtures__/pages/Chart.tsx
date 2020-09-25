import React, { memo } from "react"
import ChartComponent from "../chart"
import { Helmet } from "react-helmet"


function ChartDraw() {
    return (
        <>
            <Helmet>
                <title>Draw chart</title>
            </Helmet>
            <ChartComponent />
        </>
    )
}

export default memo(ChartDraw)

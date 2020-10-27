import React, { memo } from "react"
import { Redirect } from "react-router-dom"


function Home() {
    return (
        <Redirect
            to="/chart"
        />
    )
}

export default memo(Home)

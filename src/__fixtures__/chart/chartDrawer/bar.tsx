import { useQuery } from "@apollo/client"
import React, { memo } from "react"
import { GET_CURRENT_CHART_STATE } from "../../../graphql/queries"


function BarDrawer() {

    // get local chart state
    const { data, loading } = useQuery(GET_CURRENT_CHART_STATE)

    if (loading) {
        return <p>Loading...</p>
    }

    console.log(data)

    return (
        <div>area</div>
    )
}

export default memo(BarDrawer)
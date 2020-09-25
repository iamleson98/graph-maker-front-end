import React, { memo } from "react"
import { Helmet } from "react-helmet"


function Qa() {
    return (
        <div>
            <Helmet>
                <title>
                    Q &amp; A
                </title>
            </Helmet>
            <div>
                weather page
            </div>
        </div>
    )
}

export default memo(Qa)

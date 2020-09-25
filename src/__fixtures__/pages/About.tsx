import React, { memo } from "react"
import { Helmet } from "react-helmet"


function AboutUs() {
    return (
        <div>
            <Helmet>
                <title>
                    About Us
                </title>
            </Helmet>
            <div>
                weather page
            </div>
        </div>
    )
}

export default memo(AboutUs)

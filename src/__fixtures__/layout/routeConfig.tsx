import React from "react"
import Pages from "../pages"


function Dummy() {
    return (
        <div />
    )
}

export const authRoute = {
    path: "/auth",
    component: Pages.AuthPage,
}

export const routes = {
    user: {
        path: "/username",
        component: Pages.UserPage,
        name: ""
    },
    chart: {
        path: "/chart",
        component: Pages.ChartPage,
        name: "Chart"
    },
    weather: {
        path: "/weather",
        component: Dummy,
        name: "Weather"
    },
    about: {
        path: "/about",
        component: Dummy,
        name: "About"
    },
    qna: {
        path: "/qa",
        component: Dummy,
        name: "Q & A"
    }
}

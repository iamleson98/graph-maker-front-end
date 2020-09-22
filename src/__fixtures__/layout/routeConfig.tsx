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
        i18Name: ""
    },
    chart: {
        path: "/chart",
        component: Pages.ChartPage,
        i18Name: "chart"
    },
    weather: {
        path: "/weather",
        component: Dummy,
        i18Name: "weather"
    },
    about: {
        path: "/about",
        component: Dummy,
        i18Name: "about"
    },
    qna: {
        path: "/qa",
        component: Dummy,
        i18Name: "qa"
    }
}

import React, { memo, Suspense } from "react"
import Navigator from "../navigator"
import { Route } from "react-router-dom"
import { authRoute, routes } from "./routeConfig"
import Gears from "../loading/Gears"
import { Helmet } from "react-helmet"
import dayjs from "dayjs"


function Layout() {

    return (
        <div className="m-auto w-full h-full bg-gray-100">
            <Helmet>
                <title>
                    Schart - Chart drawer for students
                </title>
            </Helmet>
            <Navigator />
            <main className="pt-12 h-full m-auto" style={{ maxWidth: 1366 }}>
                {Object.values(routes).map((route, idx) => (
                    <Route
                        key={idx}
                        exact={true}
                        path={route.path}
                    >
                        <route.component />
                    </Route>
                ))}
                <Route
                    path={authRoute.path}
                    exact={true}
                >
                    <authRoute.component />
                </Route>
            </main>
            <footer className="py-1 text-xs text-center font-normal text-gray-600">
                &copy; Schart {dayjs().year()}
            </footer>
        </div>
    )
}

export default memo(function () {
    return (
        <Suspense fallback={(
            <div className="w-screen h-screen flex items-center justify-center">
                <Gears />
            </div>
        )}>
            <Layout />
        </Suspense>
    )
})


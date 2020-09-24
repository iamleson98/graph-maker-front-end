import React, { memo, Suspense } from "react"
import Navigator from "../navigator"
import { Route } from "react-router-dom"
import { authRoute, routes } from "./routeConfig"
import Gears from "../loading/Gears"


function Layout() {

    return (
        <div className="m-auto w-full h-full bg-gray-100">
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


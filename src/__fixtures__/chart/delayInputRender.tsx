import React, { useEffect, useState, Fragment } from "react"
import Fade from "@material-ui/core/Fade"
import Gears from "../loading/Gears"
import { timer } from "rxjs"


export function useDelay(time: number): boolean {

    // loading state
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        // subscription to close the loading gears
        const $timerSub = timer(time).subscribe(() => {
            setLoading(false)
        })

        return () => {
            $timerSub?.unsubscribe()
        }
    }, [time])

    return loading
}

export interface CustomChartRenderProp {
    children: React.ReactElement<any, any>;
}

export function DelayChartRender({ children }: CustomChartRenderProp) {

    const loading = useDelay(1000)

    return (
        <Fragment>
            {loading ? (
                <Gears
                    style={{
                        width: 200,
                        height: 200,
                        margin: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                />
            ) : (
                    <Fade in={!loading}
                        timeout={{
                            enter: 1000
                        }}
                    >
                        {children}
                    </Fade>
                )}
        </Fragment>
    )
}

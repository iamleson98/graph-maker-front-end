import React, { useEffect, useState, Fragment } from 'react'
import Fade from '@material-ui/core/Fade'
import Gears from '../loading/Gears'


export function useDelay(time: number): boolean {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false)
        }, time)

        return () => {
            clearTimeout(timeout)
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
                        <div className="p-1">
                            {children}
                        </div>
                    </Fade>
                )}
        </Fragment>
    )
}

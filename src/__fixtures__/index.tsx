import React from "react";
import { ApolloClient, InMemoryCache, useQuery } from "@apollo/client"
import { ApolloProvider, makeVar } from "@apollo/client"
// import Chart from "./chart"
import UserInfo from "./userInfo"
import History from "./history"
import Nav from "./navigator"
import { BarchartState } from "../__fixtures__/barChartInput/reducer"
import { LineChartState } from "../__fixtures__/lineChartInput/reducer"
import { PieChartState } from "../__fixtures__/pieChartInput/reducer"

import "../tailwind/out.css"
import "../index.css"
import { GET_CURRENT_CHART_STATE } from "../graphql/queries";


export interface DummyState { }

export interface LocalState {
    chartType: "line" | "bar" | "pie" | "scatter" | "area";
    barChartState: null | BarchartState;
    lineChartState: null | LineChartState;
    pieChartState: null | PieChartState;
    areaChartState: null | DummyState;
    scatterChartState: null | DummyState;
}

// local state
export const localState = makeVar<LocalState>({
    chartType: "bar",
    barChartState: null,
    lineChartState: null,
    pieChartState: null,
    areaChartState: null,
    scatterChartState: null
})

const client = new ApolloClient({
    uri: "https://localhost:6000",
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    currentChartState: {
                        read() {
                            const {
                                chartType,
                                barChartState,
                                lineChartState,
                                pieChartState,
                                areaChartState,
                                scatterChartState
                            } = localState()

                            // check chart type and decode what to return
                            let chartState;
                            switch (chartType) {
                                case "area":
                                    chartState = areaChartState;
                                    break
                                case "bar":
                                    chartState = barChartState;
                                    break
                                case "line":
                                    chartState = lineChartState;
                                    break
                                case "pie":
                                    chartState = pieChartState;
                                    break
                                case "scatter":
                                    chartState = scatterChartState;
                                    break
                            }
                            return {
                                chartType,
                                chartState
                            }
                        }
                    },

                }
            }
        }
    })
})

function App() {

    return (
        <ApolloProvider client={client}>
            <Nav />
            <main className="mt-16">
                <div className="flex flex-wrap">
                    <div className="w-3/12 sm:w-full">
                        <UserInfo />
                    </div>
                    <div className="w-8/12 sm:w-full">
                        <History />
                    </div>
                </div>
            </main>
            <A />
        </ApolloProvider>
    );
}

function A() {

    const { data } = useQuery(GET_CURRENT_CHART_STATE)
    console.log(data)

    return <></>
}

export default App;

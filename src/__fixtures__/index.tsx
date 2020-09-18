import React from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client"
import { ApolloProvider, makeVar } from "@apollo/client"
import Chart from "./chart"
import { KeyOfStringInterface } from "../constants";
import "../tailwind/out.css"
import "../index.css"
import { BarchartState } from "./barChartInput/reducer";
import { LineChartState } from "./lineChartInput/reducer";
import { PieChartState } from "./pieChartInput/reducer";


export type ChartType =
    | "Bar chart"
    | "Pie chart"
    | "Line chart"
    | "Area chart"
    | "Scatter chart"

export type localStateKey =
    | "chartType"
    | "barChartState"
    | "lineChartState"
    | "pieChartState"
    | "areaChartState"
    | "scatterChartState"

export interface LocalState extends KeyOfStringInterface {
    chartType: ChartType;
    barChartState: BarchartState | null;
    lineChartState: LineChartState | null;
    pieChartState: PieChartState | null;
    areaChartState: any;
    scatterChartState: any;
}

// local state
export const localState = makeVar<LocalState>({
    chartType: "Bar chart",
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
                                case "Area chart":
                                    chartState = areaChartState;
                                    break
                                case "Bar chart":
                                    chartState = barChartState;
                                    break
                                case "Line chart":
                                    chartState = lineChartState;
                                    break
                                case "Pie chart":
                                    chartState = pieChartState;
                                    break
                                case "Scatter chart":
                                    chartState = scatterChartState;
                                    break
                            }
                            return chartState
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
            <Chart />
        </ApolloProvider>
    );
}

export default App;

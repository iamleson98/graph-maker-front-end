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
import { InitBarChartState, InitLineChartState, InitPieChartState } from "./initState";
import Navigator from "./navigator"


export type ChartType =
    | "Bar chart"
    | "Pie chart"
    | "Line chart"
    | "Area chart"
    | "Scatter chart"

export type localStateKey =
    | "chartDrawMutexReleased"
    | "chartType"
    | "barChartState"
    | "lineChartState"
    | "pieChartState"
    | "areaChartState"
    | "scatterChartState"

export interface LocalState extends KeyOfStringInterface {
    chartType: ChartType;
    chartDrawMutexReleased: boolean;
    barChartState: BarchartState;
    lineChartState: LineChartState;
    pieChartState: PieChartState;
    areaChartState: any;
    scatterChartState: any;
}

// local state
export const localState = makeVar<LocalState>({
    chartType: "Bar chart",
    chartDrawMutexReleased: true,
    barChartState: InitBarChartState,
    lineChartState: InitLineChartState,
    pieChartState: InitPieChartState,
    areaChartState: null,
    scatterChartState: null
})

const client = new ApolloClient({
    uri: "https://localhost:6000",
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                }
            }
        }
    })
})

function App() {

    return (
        <ApolloProvider client={client}>
            <Navigator />
            <main className="mt-10 bg-gray-200">
                <Chart />
            </main>
        </ApolloProvider>
    );
}

export default App;

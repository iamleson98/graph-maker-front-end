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

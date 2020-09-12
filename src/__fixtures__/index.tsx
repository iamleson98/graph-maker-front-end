import React from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client"
import { ApolloProvider, makeVar } from "@apollo/client"
// import Chart from "./chart"
import UserInfo from "./userInfo"
import History from "./history"
import Nav from "./navigator"

import "../index.css"


// local state
export const localState = makeVar({
    canClickDrawChart: false
})

const client = new ApolloClient({
    uri: "https://localhost:6000",
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    canClickDrawChart: {
                        read() {
                            return localState().canClickDrawChart;
                        }
                    }
                }
            }
        }
    })
})

function App() {
    return (
        <ApolloProvider client={client}>
            <Nav />
            <div className="flex flex-wrap">
                <div className="w-3/12 xs:w-full">
                    <UserInfo />
                </div>
                <div className="w-8/12 xs:w-full">
                    <History />
                </div>
            </div>
        </ApolloProvider>
    );
}

export default App;

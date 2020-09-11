import React from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client"
import { ApolloProvider, makeVar } from "@apollo/client"
// import Chart from "./chart"
import UserInfo from "./userInfo"
import History from "./history"


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
            <div className="flex">
                <div className="w-3/12">
                    <UserInfo />
                </div>
                <div className="w-8/12">
                    <History />
                </div>
            </div>
        </ApolloProvider>
    );
}

export default App;

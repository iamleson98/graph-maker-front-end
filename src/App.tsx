import React from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client"
import { ApolloProvider, makeVar } from "@apollo/client"


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
      hi
    </ApolloProvider>
  );
}

export default App;

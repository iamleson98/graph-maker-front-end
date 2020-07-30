import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client'


const client = new ApolloClient({
  uri: "https://localhost:6000",
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      hi
    </ApolloProvider>
  );
}

export default App;

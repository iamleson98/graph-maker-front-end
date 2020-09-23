import { gql } from "@apollo/client"


export const GET_CURRENT_CHART_STATE = gql`
  query CurrentChartState {
    currentChartState @client
  }
`;

// export const LOGIN = gql`
//   query login()
// `

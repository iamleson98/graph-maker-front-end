import { gql } from "@apollo/client"


export const GET_CURRENT_CHART_STATE = gql`
  query CurrentChartState {
    currentChartState @client
  }
`;

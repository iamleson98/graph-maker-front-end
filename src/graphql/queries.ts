import { gql } from "@apollo/client"


export const CHECK_CHART_DRAW_BUTTON_CAN_ACTIVE = gql`
  query canClickDrawChart {
    canClickDrawChart @client
  }
`;

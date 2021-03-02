import { gql } from "@apollo/client";

export const GET_SELECTED_BLOCK = gql`
    query GetSelectedBlock {
        selectedBlock @client {
            hash
            time
            height
        }
    }
`
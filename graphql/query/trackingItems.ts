import { gql } from '@apollo/client';

export const GET_TRACKING_ITEMS = gql`
  query GetTrackingItems {
    getTrackingItems {
      name
      value {
        customer {
          email
          name
        }
        customer_id
        items {
          item_id
          name
          price
          quantity
        }
      }
    }
  }
`;

import { gql } from 'graphql-request';
import client from './api';

export interface ItemInput {
  valueId: number;
  extras: number[];
}

export interface Extra {
  valueId: number;
  value: string;
}

export interface Item {
  valueId: number;
  value: string;
  extras: Extra[];
}
export interface TripleDipper {
  id: number;
  orderId: number;
  items: Item[];
}

export async function addToCart(items: ItemInput[]): Promise<TripleDipper> {
  const q = gql`
    mutation addToCart($items: [ItemInput!]!) {
      addToCart(items: $items) {
        id
        orderId
        items {
          valueId
          value
          extras {
            valueId
            value
          }
        }
      }
    }
  `;
  const data = await client.request(q, { items });
  return data.addToCart as TripleDipper;
}

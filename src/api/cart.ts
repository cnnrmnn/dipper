import { gql } from 'graphql-request';
import client from './api';

export interface ItemInput {
  id?: number;
  valueId: number;
  extras: number[];
}

export interface Extra {
  id: number;
  valueId: number;
  value: string;
}

export interface Item {
  id: number;
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
          id
          valueId
          value
          extras {
            id
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

export async function removeFromCart(tripleDipperId: number): Promise<void> {
  const q = gql`
    mutation removeFromCart($tripleDipperId: Int!) {
      removeFromCart(tripleDipperId: $tripleDipperId)
    }
  `;
  await client.request(q, { tripleDipperId });
}

export async function getCart(): Promise<TripleDipper[]> {
  const q = gql`
    query {
      currentOrder {
        tripleDippers {
          id
          items {
            id
            valueId
            value
            extras {
              id
              valueId
              value
            }
          }
        }
      }
    }
  `;
  const data = await client.request(q);
  return data.currentOrder.tripleDippers as TripleDipper[];
}

import { gql, request } from 'graphql-request';
import { Item } from './item';

export interface TripleDipper {
  id: number;
  orderId: number;
}

export async function addToCart(items: Item[]): Promise<TripleDipper> {
  const q = gql`
    mutation addToCart($items: [ItemValue!]!) {
      addToCart(items: $items) {
        id
        orderId
      }
    }
  `;
  const data = await request(`${process.env.SERVER_URL}/graphql`, q, { items });
  return data.addToCart as TripleDipper;
}

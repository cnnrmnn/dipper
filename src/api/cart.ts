import { gql, request } from 'graphql-request';

export interface ItemInput {
  valueId: number;
  extras: number[];
}

export interface TripleDipper {
  id: number;
  orderId: number;
}

export async function addToCart(items: ItemInput[]): Promise<TripleDipper> {
  const q = gql`
    mutation addToCart($items: [ItemInput!]!) {
      addToCart(items: $items) {
        id
        orderId
      }
    }
  `;
  const data = await request(`${process.env.SERVER_URL}/graphql`, q, { items });
  return data.addToCart as TripleDipper;
}

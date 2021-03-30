import { gql, request } from 'graphql-request';

export interface TripleDipper {
  id: number;
  orderId: number;
}

export async function addToCart(
  itemValueId: number,
  extras: number[]
): Promise<TripleDipper> {
  const q = gql`
    mutation addToCart(itemValueId: Int!, extras: [Int!]!) {
      id
      orderId
    }
  `;
  const data = await request(`${process.env.SERVER_URL}/graphql`, q, {
    itemValueId,
    extras,
  });
  return data.addToCart as TripleDipper;
}

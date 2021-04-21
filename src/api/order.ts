import { gql } from 'graphql-request';
import client from './api';
import { Address } from './address';
import { TripleDipper } from './cart';

export interface Order {
  id: number;
  address: Address;
  deliveryFee: number;
  serviceFee: number;
  deliveryTime: string;
  tax: number;
  subtotal: number;
  tripleDippers: TripleDipper[];
}

export async function checkOut(addressId: number): Promise<Order> {
  const q = gql`
    mutation checkOut($addressId: Int!) {
      checkOut(addressId: $addressId) {
        id
        address {
          id
          street
          unit
          city
          state
          zip
          notes
        }
        deliveryFee
        serviceFee
        deliveryTime
        tax
        subtotal
        tripleDippers {
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
    }
  `;
  const data = await client.request(q, { addressId });
  return data.checkOut as Order;
}

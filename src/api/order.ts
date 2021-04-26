import { gql } from 'graphql-request';
import client from './api';
import { Address } from './address';
import { TripleDipper } from './cart';

export interface Order {
  id: number;
  address: Address;
  completed: boolean;
  location: string;
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
        location
        completed
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

export async function placeOrder(
  name: string,
  number: string,
  month: string,
  year: string,
  cvv: string,
  zip: string
): Promise<Order> {
  const q = gql`
    mutation placeOrder(
      $name: String!
      $number: String!
      $month: String!
      $year: String!
      $cvv: String!
      $zip: String!
    ) {
      placeOrder(
        name: $name
        number: $number
        month: $month
        year: $year
        cvv: $cvv
        zip: $zip
      ) {
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
        location
        completed
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
  const data = await client.request(q, { name, number, month, year, cvv, zip });
  return data.placeOrder as Order;
}

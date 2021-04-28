import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { gql } from 'graphql-request';
import client from './api';
import { Address } from './address';
import { TripleDipper } from './cart';

dayjs.extend(utc);

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

const orderSchema = `
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
`;
export async function checkOut(addressId: number): Promise<Order> {
  const q = gql`
    mutation checkOut($addressId: Int!) {
      checkOut(addressId: $addressId) {
        ${orderSchema}
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
        ${orderSchema}
      }
    }
  `;
  const data = await client.request(q, { name, number, month, year, cvv, zip });
  return data.placeOrder as Order;
}

export async function getOrders(): Promise<Order[]> {
  const q = gql`
    query {
      orders {
        ${orderSchema}
      }
    }
  `;
  try {
    const data = await client.request(q);
    return data.orders as Order[];
  } catch (error) {
    return [];
  }
}

export function parseDeliveryTime(time: string): string {
  return dayjs
    .utc(time.slice(0, 19), 'YYYY-MM-DD HH:mm:ss')
    .local()
    .format('dddd MMMM D, YYYY [at] h:mm a');
}

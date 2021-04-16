import { gql } from 'graphql-request';
import client from './api';

export interface Address {
  id: number;
  street: string;
  unit: string;
  city: string;
  state: string;
  zip: string;
  notes: string;
}

export function addressString({
  street,
  unit,
  city,
  state,
  zip,
}: Address): string {
  return `${street}, ${unit && unit + ', '}${city}, ${state} ${zip}`;
}

export async function getAddresses(): Promise<Address[]> {
  const q = gql`
    query {
      addresses {
        id
        street
        unit
        city
        state
        zip
        notes
      }
    }
  `;
  const data = await client.request(q);
  return data.addresses as Address[];
}

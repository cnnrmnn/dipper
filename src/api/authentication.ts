import { request, gql } from 'graphql-request';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export async function sendCode(phone: string): Promise<boolean> {
  const q = gql`
    mutation sendCode($phone: String!) {
      sendCode(phone: $phone)
    }
  `;
  const data = await request('http://localhost:3000/graphql', q, { phone });
  // Unnecessary type assertion. Exists to emphasize that data.sendCode is a
  // boolean rather than another type being coerced into a boolean.
  return data.sendCode as boolean;
}

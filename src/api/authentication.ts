import { gql } from 'graphql-request';
import client from './api';

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
  const data = await client.request(q, { phone });
  // Unnecessary type assertion. Exists to emphasize that data.sendCode is a
  // boolean rather than another type being coerced into a boolean.
  return data.sendCode as boolean;
}

export async function logIn(phone: string, code: string): Promise<User> {
  const q = gql`
    mutation logIn($phone: String!, $code: String!) {
      logIn(phone: $phone, code: $code) {
        id
        firstName
        lastName
        phone
        email
      }
    }
  `;
  const data = await client.request(q, {
    phone,
    code,
  });
  return data.logIn as User;
}

export async function signUp(
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  code: string
): Promise<User> {
  const q = gql`
    mutation signUp(
      $firstName: String!
      $lastName: String!
      $phone: String!
      $email: String!
      $code: String!
    ) {
      signUp(
        firstName: $firstName
        lastName: $lastName
        phone: $phone
        email: $email
        code: $code
      ) {
        id
        firstName
        lastName
        phone
        email
      }
    }
  `;
  const data = await client.request(q, {
    firstName,
    lastName,
    phone,
    email,
    code,
  });
  return data.signUp as User;
}

export async function me(): Promise<User | null> {
  const q = gql`
    query {
      me {
        id
        firstName
        lastName
        phone
        email
      }
    }
  `;
  try {
    const data = await client.request(q);
    return data.me;
  } catch (error) {
    return null;
  }
}

export async function logOut(): Promise<void> {
  const q = gql`
    mutation {
      logOut
    }
  `;
  await client.request(q);
}

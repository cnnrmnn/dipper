import { request, gql } from 'graphql-request';

export interface Extra {
  valueId: number;
  value: string;
}

export interface Item {
  valueId: number;
  value: string;
  description: string;
  imagePath: string;
  extras: Extra[];
}

export async function getItems(): Promise<Item[]> {
  const q = gql`
    query {
      itemValues {
        extras {
          value
          valueId
        }
        value
        valueId
        description
        imagePath
      }
    }
  `;
  const data = await request(`${process.env.SERVER_URL}/graphql`, q);
  return data.itemValues as Item[];
}

import { request, gql } from 'graphql-request';

export interface ExtraValue {
  valueId: number;
  value: string;
}

export interface ItemValue {
  valueId: number;
  value: string;
  description: string;
  imagePath: string;
  extras: ExtraValue[];
}

export async function getItemValues(): Promise<ItemValue[]> {
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
  return data.itemValues as ItemValue[];
}

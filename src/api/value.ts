import { request, gql } from 'graphql-request';

export interface ExtraValue {
  valueId: number;
  value: string;
}

export interface ItemValue {
  valueId: number;
  value: string;
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
      }
    }
  `;
  const data = await request('http://localhost:3000/graphql', q);
  return data.itemValues as ItemValue[];
}

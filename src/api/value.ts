import { gql } from 'graphql-request';
import client from './api';

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
  const data = await client.request(q);
  return data.itemValues as ItemValue[];
}

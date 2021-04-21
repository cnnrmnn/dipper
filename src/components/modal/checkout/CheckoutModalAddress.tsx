import { Address } from '../../../api/address';
import { modalAddress, row, notes } from './CheckoutModalAddress.css';

type Props = {
  address: Address;
};
export default function CheckoutModalAddress({ address }: Props): JSX.Element {
  return (
    <div className={modalAddress}>
      <h4 className={row}>{address.street}</h4>
      {address.unit && <h4 className={row}>{address.unit}</h4>}
      <h4
        className={row}
      >{`${address.city}, ${address.state} ${address.zip}`}</h4>
      <p className={notes}>{`Notes: ${address.notes}`}</p>
    </div>
  );
}

import { parseDeliveryTime } from '../../api/order';
import { Address } from '../../api/address';
import styles from './ModalAddress.css';

type Props = {
  address: Address;
  deliveryTime: string;
};

export default function ModalAddress({
  address,
  deliveryTime,
}: Props): JSX.Element {
  return (
    <div className={styles.modalAddress}>
      <h4 className={styles.time}>{parseDeliveryTime(deliveryTime)}</h4>
      <h4 className={styles.row}>{address.street}</h4>
      {address.unit && <h4 className={styles.row}>{address.unit}</h4>}
      <h4
        className={styles.row}
      >{`${address.city}, ${address.state} ${address.zip}`}</h4>
      <p className={styles.notes}>{`Notes: ${address.notes}`}</p>
    </div>
  );
}

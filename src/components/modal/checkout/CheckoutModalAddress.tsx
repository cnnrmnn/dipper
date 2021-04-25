import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Address } from '../../../api/address';
import styles from './CheckoutModalAddress.css';

dayjs.extend(utc);

type Props = {
  address: Address;
  deliveryTime: string;
};
export default function CheckoutModalAddress({
  address,
  deliveryTime,
}: Props): JSX.Element {
  function parseDeliveryTime(time: string): string {
    return dayjs
      .utc(time.slice(0, 19), 'YYYY-MM-DD HH:mm:ss')
      .local()
      .format('dddd MMMM D, YYYY [at] h:mm a');
  }
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

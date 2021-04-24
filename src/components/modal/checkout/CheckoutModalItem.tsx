import { TripleDipper } from '../../../api/cart';
import styles from './CheckoutModalItem.css';

type Props = {
  tripleDipper: TripleDipper;
};

export default function CheckoutModalItem({
  tripleDipper,
}: Props): JSX.Element {
  return (
    <div className={styles.modalItem}>
      <h4 className={styles.heading}>Triple Dipper</h4>
      {tripleDipper.items.map((item) => (
        <div key={item.id}>
          <h5 className={styles.item}>{item.value}</h5>
          {item.extras.map((extra) => (
            <p className={styles.extra} key={extra.id}>
              {extra.value}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

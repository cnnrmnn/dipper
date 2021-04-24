import styles from './CheckoutModalReceiptRow.css';

type Props = {
  title: string;
  price: number;
  bold?: boolean;
};

export default function CheckoutModalReceiptRow({
  title,
  price,
  bold,
}: Props): JSX.Element {
  const titleClass = styles.title + (bold ? ` ${styles.bold}` : '');
  return (
    <div className={styles.row}>
      <h3 className={titleClass}>{title}</h3>
      <p className={styles.price}>{`$${price.toFixed(2)}`}</p>
    </div>
  );
}

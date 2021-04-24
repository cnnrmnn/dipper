import styles from './CartBoxItemButton.css';

type Props = {
  removeFromCart(): void;
};

export default function CartBoxItemButton({
  removeFromCart,
}: Props): JSX.Element {
  return <button className={styles.button} onClick={removeFromCart} />;
}

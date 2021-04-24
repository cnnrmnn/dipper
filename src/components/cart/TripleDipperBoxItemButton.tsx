import styles from './TripleDipperBoxItemButton.css';

type Props = {
  removeItemInput(): void;
};

export default function TripleDipperBoxItemButton({
  removeItemInput,
}: Props): JSX.Element {
  return <button className={styles.button} onClick={removeItemInput} />;
}

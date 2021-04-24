import styles from './ModalButton.css';

type Props = {
  close(): void;
};

export default function ModalButton({ close }: Props): JSX.Element {
  return <button className={styles.button} onClick={close} />;
}

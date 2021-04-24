import styles from './BoxError.css';

type Props = {
  message: string;
};

export default function BoxError({ message }: Props): JSX.Element {
  return <p className={styles.error}>{message}</p>;
}

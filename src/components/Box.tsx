import styles from './Box.css';

type Props = {
  children: React.ReactNode;
};

export default function Box({ children }: Props): JSX.Element {
  return <div className={styles.box}>{children}</div>;
}

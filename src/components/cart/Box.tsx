import styles from './Box.css';

type Props = {
  children: (null | string | JSX.Element)[];
};

export default function Box({ children }: Props): JSX.Element {
  return <div className={styles.box}>{children}</div>;
}

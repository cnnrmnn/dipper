import threeDots from '../../../assets/icons/three-dots.svg';
import styles from './Button.css';

type Props = {
  text: string;
  fontSize: string;
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
};
export default function Button({
  type,
  text,
  loading,
  disabled,
  fontSize,
  onClick,
}: Props): JSX.Element {
  return (
    <button
      type={type}
      className={styles.button}
      style={{ fontSize }}
      disabled={disabled}
      onClick={onClick}
    >
      {loading ? <img className={styles.loader} src={threeDots} /> : text}
    </button>
  );
}

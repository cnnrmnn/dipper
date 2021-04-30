import threeDots from '../../../assets/icons/three-dots.svg';
import styles from './Button.css';

type Props = {
  children: React.ReactNode;
  fontSize?: string;
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
  unstyled?: boolean;
};
export default function Button({
  children,
  type,
  loading,
  disabled,
  fontSize,
  onClick,
  unstyled,
}: Props): JSX.Element {
  const className = styles.button + (unstyled ? '' : ` ${styles.styled}`);
  return (
    <button
      type={type}
      className={className}
      style={{ fontSize, height: fontSize }}
      disabled={disabled}
      onClick={onClick}
    >
      {loading ? <img className={styles.loader} src={threeDots} /> : children}
    </button>
  );
}

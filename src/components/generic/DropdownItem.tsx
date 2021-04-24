import styles from './DropdownItem.css';

type Props = {
  text: string;
  onClick?: ((event: React.MouseEvent) => void) | undefined;
};

export default function DropdownItem({ text, onClick }: Props): JSX.Element {
  return (
    <li className={styles.item} onClick={onClick}>
      {text}
    </li>
  );
}

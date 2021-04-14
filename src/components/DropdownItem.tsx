import { item } from './DropdownItem.css';

type Props = {
  text: string;
  onClick(event: React.MouseEvent<HTMLLIElement>): void;
};

export default function DropdownItem({ text, onClick }: Props): JSX.Element {
  return (
    <li className={item} onClick={onClick}>
      {text}
    </li>
  );
}
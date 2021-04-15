import { button } from './CartBoxItemButton.css';

type Props = {
  removeFromCart(): void;
};

export default function CartBoxItemButton({
  removeFromCart,
}: Props): JSX.Element {
  return <button className={button} onClick={removeFromCart} />;
}

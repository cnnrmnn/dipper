import { button } from './ModalButton.css';

type Props = {
  closeModal(): void;
};

export default function ModalButton({ closeModal }: Props): JSX.Element {
  return <button className={button} onClick={closeModal} />;
}

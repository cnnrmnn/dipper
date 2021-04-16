import { error } from './ModalError.css';

type Props = {
  message: string;
};

export default function ModalError({ message }: Props): JSX.Element {
  return <p className={error}>{message}</p>;
}

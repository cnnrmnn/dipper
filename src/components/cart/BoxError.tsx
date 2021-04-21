import { error } from './BoxError.css';

type Props = {
  message: string;
};
export default function BoxError({ message }: Props): JSX.Element {
  return <p className={error}>{message}</p>;
}

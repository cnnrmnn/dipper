import { box } from './Box.css';

type Props = {
  children: null | JSX.Element | JSX.Element[];
};

export default function Box({ children }: Props): JSX.Element {
  return <div className={box}>{children}</div>;
}

import { body } from './ModalForm.css';

type Props = {
  onSubmit(event: React.SyntheticEvent): Promise<void>;
  children: (string | JSX.Element)[];
};

export default function ModalForm({ onSubmit, children }: Props): JSX.Element {
  return (
    <form className={body} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

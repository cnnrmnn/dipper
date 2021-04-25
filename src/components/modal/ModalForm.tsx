import styles from './ModalForm.css';

type Props = {
  onSubmit(event: React.SyntheticEvent): Promise<void>;
  children: (string | JSX.Element)[] | JSX.Element;
};

export default function ModalForm({ onSubmit, children }: Props): JSX.Element {
  return (
    <form className={styles.body} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

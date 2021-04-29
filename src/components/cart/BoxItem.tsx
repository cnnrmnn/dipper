import { CSSTransition } from 'react-transition-group';
import styles from './BoxItem.css';

type Props = {
  inProp: boolean;
  onExited(): void;
  children: React.ReactNode;
};

export default function BoxItem({
  inProp,
  onExited,
  children,
}: Props): JSX.Element {
  return (
    <CSSTransition
      in={inProp}
      appear={true}
      timeout={350}
      classNames={{
        appear: styles.itemAppear,
        appearActive: styles.itemAppearActive,
        exitActive: styles.itemExitActive,
      }}
      onExited={onExited}
    >
      <div className={styles.item}>{children}</div>
    </CSSTransition>
  );
}

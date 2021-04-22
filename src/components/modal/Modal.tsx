import { useEffect, useRef } from 'react';
import ModalButton from './ModalButton';
import * as styles from './Modal.css';

type Props = {
  title: string;
  height?: string;
  width?: string;
  minHeight?: string;
  minWidth?: string;
  maxHeight?: string;
  maxWidth?: string;
  children?: JSX.Element | JSX.Element[];
  header?: JSX.Element | null;
  footer?: JSX.Element | null;
  close(): void;
};

export default function Modal({
  title,
  height,
  width,
  minHeight,
  minWidth,
  maxHeight,
  maxWidth,
  close,
  children,
  header,
  footer,
}: Props): JSX.Element {
  const modalRef = useRef<HTMLDivElement>(null);

  function setAppFilter(value: string): void {
    const app = document.getElementById('app');
    if (app) app.style.filter = value;
  }

  function setBodyOverflow(value: string): void {
    document.getElementsByTagName('body')[0].style.overflow = value;
  }

  useEffect(() => {
    setAppFilter('blur(2px)');
    setBodyOverflow('hidden');
    return () => {
      setAppFilter('');
      setBodyOverflow('');
    };
  }, []);

  function handleClick(event: React.MouseEvent): void {
    if (modalRef.current && !modalRef.current.contains(event.target as Node))
      close();
  }

  function handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') close();
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false);
    return () => document.removeEventListener('keydown', handleKeyDown, false);
  });

  return (
    <div className={styles.container} onClick={handleClick}>
      <div
        className={styles.modal}
        ref={modalRef}
        style={{ height, width, minHeight, minWidth, maxHeight, maxWidth }}
      >
        <div className={styles.header}>
          <div className={styles.bar}>
            <h2 className={styles.heading}>{title}</h2>
            <ModalButton close={close} />
          </div>
          {header}
        </div>
        <div>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
}

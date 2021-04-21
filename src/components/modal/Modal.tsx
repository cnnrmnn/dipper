import { useEffect, useRef } from 'react';
import ModalButton from './ModalButton';
import { container, modal, header, heading } from './Modal.css';

type Props = {
  title: string;
  height?: string;
  width?: string;
  minHeight?: string;
  minWidth?: string;
  maxHeight?: string;
  maxWidth?: string;
  children: null | JSX.Element | JSX.Element[];
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
    <div className={container} onClick={handleClick}>
      <div
        className={modal}
        ref={modalRef}
        style={{ height, width, minHeight, minWidth, maxHeight, maxWidth }}
      >
        <div className={header}>
          <h2 className={heading}>{title}</h2>
          <ModalButton close={close} />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

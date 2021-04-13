import { useEffect, useRef } from 'react';
import ModalButton from './ModalButton';
import { container, modal, header, heading } from './Modal.css';

type Props = {
  title: string;
  height: string;
  width: string;
  setVisible(visible: boolean): void;
  children(closeModal: () => void): JSX.Element;
};

export default function Modal({
  title,
  height,
  width,
  setVisible,
  children,
}: Props): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  function setSiblingFilters(value: string): void {
    // Use optional chaining to keep code concise. If containerRef.current is null,
    // parent will be undefined and the code will work as intended.
    const parent = containerRef.current?.parentElement;
    if (parent) {
      let sibling = parent.firstChild as HTMLElement | null;
      while (sibling) {
        if (
          sibling !== containerRef.current &&
          sibling.nodeType === Node.ELEMENT_NODE
        ) {
          sibling.style.filter = value;
        }
        sibling = sibling.nextElementSibling as HTMLElement | null;
      }
    }
  }

  function setBodyOverflow(value: string): void {
    document.getElementsByTagName('body')[0].style.overflow = value;
  }

  useEffect(() => {
    setSiblingFilters('blur(2px)');
    setBodyOverflow('hidden');
  }, []);

  function closeModal(): void {
    setBodyOverflow('');
    // Can't do this in effect clean-up because ref.current is set to null.
    setSiblingFilters('');
    setVisible(false);
  }

  function handleClick(event: React.MouseEvent): void {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  }

  function handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      closeModal();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false);
    return () => document.removeEventListener('keydown', handleKeyDown, false);
  });
  return (
    <div className={container} onClick={handleClick} ref={containerRef}>
      <div className={modal} ref={modalRef} style={{ height, width }}>
        <div className={header}>
          <h2 className={heading}>{title}</h2>
          <ModalButton closeModal={closeModal} />
        </div>
        <div>{children(closeModal)}</div>
      </div>
    </div>
  );
}

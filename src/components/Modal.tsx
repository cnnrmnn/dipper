import { useEffect, useRef } from 'react';
import ModalButton from './ModalButton';
import { container, modal, header, heading } from './Modal.css';

type Props = {
  title: string;
  height: string;
  width: string;
  setVisible(visible: boolean): void;
  children: JSX.Element;
};

export default function Modal({
  title,
  height,
  width,
  setVisible,
  children,
}: Props): JSX.Element {
  const node = useRef<HTMLDivElement>(null);

  function setSiblingFilters(value: string): void {
    // Use optional chaining to keep code concise. If node.current is null,
    // parent will be undefined and the code will work as intended.
    const parent = node.current?.parentElement;
    if (parent) {
      let sibling = parent.firstChild as HTMLElement | null;
      while (sibling) {
        if (
          sibling !== node.current &&
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
  });

  function closeModal(): void {
    setBodyOverflow('');
    // Can't do this in effect clean-up because ref.current is set to null.
    setSiblingFilters('');
    setVisible(false);
  }
  return (
    <div className={container} ref={node}>
      <div className={modal} style={{ height, width }}>
        <div className={header}>
          <h2 className={heading}>{title}</h2>
          <ModalButton closeModal={closeModal} />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

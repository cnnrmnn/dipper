import { useEffect, useRef, useState } from 'react';
import styles from './Dropdown.css';

type Props = {
  title: string;
  outline?: boolean;
  centerHeading?: boolean;
  children: null | JSX.Element | JSX.Element[];
  onClick?: (event: React.MouseEvent) => void;
  canOpen?: boolean;
};

export default function Dropdown({
  title,
  outline,
  centerHeading,
  children,
  onClick,
  canOpen,
}: Props): JSX.Element {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  function handleOutsideClick(event: MouseEvent): void {
    if (ref.current && !ref.current.contains(event.target as Node))
      setOpen(false);
  }

  function handleClick(event: React.MouseEvent): void {
    if (onClick) onClick(event);
    if (canOpen !== false) setOpen(!open);
  }

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick, false);
    return () =>
      document.removeEventListener('click', handleOutsideClick, false);
  });

  const dropdownClass =
    styles.dropdown +
    (outline ? ` ${styles.dropdownOutline}` : '') +
    (open ? ` ${styles.dropdownOpen}` : '');
  const headingClass =
    styles.heading + (centerHeading ? ` ${styles.headingCenter}` : '');
  return (
    <div className={dropdownClass} ref={ref} onClick={handleClick}>
      <h2 className={headingClass}>{title}</h2>
      {open && <ul className={styles.items}>{children}</ul>}
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import styles from './Dropdown.css';

type Props = {
  title: string;
  outline?: boolean;
  centerHeading?: boolean;
  children: null | JSX.Element | JSX.Element[];
};

export default function Dropdown({
  title,
  outline,
  centerHeading,
  children,
}: Props): JSX.Element {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  function handleClick(event: MouseEvent): void {
    if (ref.current && !ref.current.contains(event.target as Node))
      setOpen(false);
  }

  useEffect(() => {
    document.addEventListener('click', handleClick, false);
    return () => document.removeEventListener('click', handleClick, false);
  });

  const dropdownClass =
    styles.dropdown +
    (outline ? ` ${styles.dropdownOutline}` : '') +
    (open ? ` ${styles.dropdownOpen}` : '');
  const headingClass =
    styles.heading + (centerHeading ? ` ${styles.headingCenter}` : '');
  return (
    <div className={dropdownClass} ref={ref} onClick={() => setOpen(!open)}>
      <h2 className={headingClass}>{title}</h2>
      {open && <ul className={styles.items}>{children}</ul>}
    </div>
  );
}

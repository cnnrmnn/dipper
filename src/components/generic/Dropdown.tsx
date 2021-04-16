import { useEffect, useRef, useState } from 'react';
import {
  dropdown,
  dropdownOutline,
  dropdownOpen,
  heading,
  headingCenter,
  items,
} from './Dropdown.css';

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
    dropdown +
    (outline ? ` ${dropdownOutline}` : '') +
    (open ? ` ${dropdownOpen}` : '');
  const headingClass = heading + (centerHeading ? ` ${headingCenter}` : '');
  return (
    <div className={dropdownClass} ref={ref} onClick={() => setOpen(!open)}>
      <h2 className={headingClass}>{title}</h2>
      {open && <ul className={items}>{children}</ul>}
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { dropdown, dropdownOpen, heading, items } from './Dropdown.css';

type Props = {
  title: string;
  children: null | JSX.Element | JSX.Element[];
};

export default function Dropdown({ title, children }: Props): JSX.Element {
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

  const className = dropdown + (open ? ` ${dropdownOpen}` : '');
  return (
    <div className={className} ref={ref} onClick={() => setOpen(!open)}>
      <h2 className={heading}>{title}</h2>
      {open && <ul className={items}>{children}</ul>}
    </div>
  );
}

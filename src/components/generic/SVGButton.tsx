import styles from './SVGButton.css';

type Props = {
  svg: string;
  onClick(event: React.MouseEvent): void;
  height?: string;
  width?: string;
};

export default function SVGButton({
  svg,
  height,
  width,
  onClick,
}: Props): JSX.Element {
  return (
    <button className={styles.button} onClick={onClick}>
      <img src={svg} style={{ height, width }} />
    </button>
  );
}

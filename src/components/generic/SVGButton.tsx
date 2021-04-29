import Button from './Button';

type Props = {
  svg: string;
  fontSize?: string;
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
  height?: string;
  width?: string;
  fill?: string;
};

export default function SVGButton({
  svg,
  fontSize,
  loading,
  disabled,
  type,
  onClick,
  height,
  width,
}: Props): JSX.Element {
  return (
    <Button
      fontSize={fontSize}
      loading={loading}
      disabled={disabled}
      unstyled={true}
      type={type}
      onClick={onClick}
    >
      <img src={svg} style={{ height, width }} />
    </Button>
  );
}

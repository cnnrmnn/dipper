import './TripleDipperBoxItemButton.css';

type Props = {
  removeItemInput(): void;
};

export default function TripleDipperBoxItemButton({
  removeItemInput,
}: Props): JSX.Element {
  return (
    <button
      className="triple-dipper-box-item-button"
      onClick={removeItemInput}
    />
  );
}

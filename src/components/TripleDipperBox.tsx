import TripleDipperBoxItem from './TripleDipperBoxItem';
import './TripleDipperBox.css';
import Button from './Button';

export default function TripleDipperBox(): JSX.Element {
  return (
    <div className="triple-dipper-box">
      <div className="triple-dipper-box-header">
        <h2 className="triple-dipper-box-heading">Triple Dipper</h2>
        <p className="triple-dipper-box-subheading">Choose any 3 items</p>
      </div>
      <TripleDipperBoxItem />
      <TripleDipperBoxItem />
      <TripleDipperBoxItem />
      <div className="triple-dipper-box-buttons">
        <Button text="Clear" handleClick={() => null} />
        <Button text="Add to cart" handleClick={() => null} />
      </div>
    </div>
  );
}

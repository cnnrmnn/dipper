import './TripleDipperBoxItem.css';

export default function TripleDipperBoxItem(): JSX.Element {
  return (
    <div className="triple-dipper-box-item">
      <img
        className="triple-dipper-box-item-image"
        src="http://localhost:3000/assets/items/8.png"
      />
      <div className="triple-dipper-box-item-text">
        <h3 className="triple-dipper-box-item-heading">Crispy Cheddar Bites</h3>
        <p className="triple-dipper-box-item-description">Ranch Dressing</p>
      </div>
    </div>
  );
}

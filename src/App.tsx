import './App.css';
import ItemBoxContainer from './components/ItemBoxContainer';
import TripleDipperBox from './components/TripleDipperBox';

export default function App(): JSX.Element {
  return (
    <>
      <h1>dipper</h1>
      <div className="app">
        <ItemBoxContainer />
        <TripleDipperBox />
      </div>
    </>
  );
}

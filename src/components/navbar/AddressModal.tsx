import Modal from '../modal/Modal';

type Props = {
  setVisible(visible: boolean): void;
};
export default function AddressModal({ setVisible }: Props): JSX.Element {
  return (
    <Modal
      title="Add an address"
      height="auto"
      width="300px"
      setVisible={setVisible}
    >
      {(closeModal) => <h1 onClick={closeModal}>hi</h1>}
    </Modal>
  );
}

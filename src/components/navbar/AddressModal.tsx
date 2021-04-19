import Modal from '../modal/Modal';
import AddressForm from './AddressForm';

type Props = {
  close(): void;
};

export default function AddressModal({ close }: Props): JSX.Element {
  return (
    <Modal title="Add an address" height="auto" width="350px" close={close}>
      <AddressForm close={close} />
    </Modal>
  );
}

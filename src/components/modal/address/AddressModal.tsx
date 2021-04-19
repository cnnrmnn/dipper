import { Address } from '../../../api/address';
import Modal from '../../modal/Modal';
import AddressForm from './AddressForm';

type Props = {
  addAddress(address: Address): void;
  setAddress(address: null | Address): void;
  close(): void;
};

export default function AddressModal({
  addAddress,
  setAddress,
  close,
}: Props): JSX.Element {
  return (
    <Modal title="Add an address" height="auto" width="350px" close={close}>
      <AddressForm
        addAddress={addAddress}
        setAddress={setAddress}
        close={close}
      />
    </Modal>
  );
}

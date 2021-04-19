import AddressModal from '../navbar/AddressModal';
import AuthenticationModal from './AuthenticationModal';

type Props = {
  modal: string;
  setModal(modal: string): void;
};

export default function Modals({ modal, setModal }: Props): JSX.Element {
  function close(): void {
    setModal('');
  }

  function currentModal(): JSX.Element {
    switch (modal) {
      case 'authentication':
        return <AuthenticationModal close={close} />;
      case 'address':
        return <AddressModal close={close} />;
      default:
        return <></>;
    }
  }

  return currentModal();
}

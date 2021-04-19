type Props = {
  modal: string;
  addressModal: JSX.Element;
  authenticationModal: JSX.Element;
};

export default function Modals({
  modal,
  addressModal,
  authenticationModal,
}: Props): JSX.Element {
  function currentModal(): JSX.Element {
    switch (modal) {
      case 'authentication':
        return authenticationModal;
      case 'address':
        return addressModal;
      default:
        return <></>;
    }
  }

  return currentModal();
}

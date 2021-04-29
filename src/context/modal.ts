import React from 'react';

interface ModalContextInterface {
  modal: null | JSX.Element;
  setModal(modal: null | JSX.Element): void;
  closeModal(): void;
}

export default React.createContext<ModalContextInterface>({
  modal: null,
  setModal: () => null,
  closeModal: () => null,
});

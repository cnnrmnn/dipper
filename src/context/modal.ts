import React from 'react';

interface ModalContextInterface {
  modal: React.ReactNode;
  setModal(modal: React.ReactNode): void;
  closeModal(): void;
}

export default React.createContext<ModalContextInterface>({
  modal: null,
  setModal: () => null,
  closeModal: () => null,
});

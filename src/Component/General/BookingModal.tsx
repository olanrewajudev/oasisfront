import React from 'react';
import { LiaTimesSolid } from 'react-icons/lia';
import Modal, { Styles } from 'react-modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  styles?: Styles;
}

const DEFAULT_STYLES: Styles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1000,
  },
  content: {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '554px',
    maxWidth: '655px',
    border: 'none',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '14px',
    outline: 'none',
    padding: '0',
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
  },
};

const BookingModal: React.FC<Props> = ({
  isOpen,
  onClose,
  children,
  styles = DEFAULT_STYLES,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      contentLabel="Custom Modal"
      style={styles}
    >
      <div className="flex items-end px-6 py-5 w-full justify-end">
        <button onClick={onClose}>
          <LiaTimesSolid size={24} />
        </button>
      </div>
      {children}
    </Modal>
  );
};

export default BookingModal;
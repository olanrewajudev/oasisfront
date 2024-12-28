import { FaTimes } from 'react-icons/fa';
import Modal from 'react-modal';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const BookingModal: React.FC<Props> = ({ children, isOpen, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Example Modal"
            shouldCloseOnOverlayClick={true}
            style={{
                overlay: {
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 50,
                },
                content: {
                    position: 'relative',
                    transform: 'none',
                    width: '100%',
                    height: '650px',
                    maxWidth: '1149px',
                    border: '0px solid gray',
                    background: '#fff',
                    overflow: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    borderRadius: '10px',
                    outline: 'none',
                    padding: '0',
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                    marginBottom:'30px'

                },
            }}
        >
            <span className="flex items-center justify-between px-10 py-5 border">
                <h2 className='text-2xl font-semibold'>Services</h2>
                <button onClick={onClose}>  <FaTimes size={24} /> </button>
            </span>
            {children}

        </Modal>
    );
};

export default BookingModal
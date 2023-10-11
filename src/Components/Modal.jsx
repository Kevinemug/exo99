/* eslint-disable react/prop-types */
import '../tenzies.css';

const Modal = ({ isActive, onClose }) => {
  return (
    <div className={`modal ${isActive ? 'active' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Congratulations!</h2>
        <p>You won the game!</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;

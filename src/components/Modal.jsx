import "./Modal.css";

const Modal = ({ handleClose, children }) => {
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={handleClose}>
            &times;
          </span>
          {children}
        </div>
      </div>
    );
};
  

export default Modal;
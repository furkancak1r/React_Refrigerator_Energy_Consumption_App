import React from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./confirmationModal.css"
function ConfirmationModal(props) {
  const { show, handleClose, handleConfirm, title, message } = props;

  return (
    <Modal show={show} onHide={handleClose} className="my-modal" dialogClassName="my-dialog">
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hayır
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Evet
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;

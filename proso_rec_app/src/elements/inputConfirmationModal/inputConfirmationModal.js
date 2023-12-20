import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./inputConfirmationModal.css";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
export default function InputConfirmationModal({
  showInputModal,
  handleInputClose,
  handleInputConfirm,
  title,
  message,
  setTesterName,
  loginInfo,
  data,
  testerNameData,
}) {
  const INITIAL_TESTER_SELECTION =
    "Testi gerçekleştiren kişinin isim soyisim bilgisini seçiniz.";

  const [selectedTester, setSelectedTester] = useState("");

  const isInputVisible =
    !data.every((item) => item.TesterName) && loginInfo === "testtakimi";
  const handleTesterSelection = (testerName) => {
    setSelectedTester(testerName);
    setTesterName(testerName);
  };

  const handleInputCloseFn = () => {
    handleInputClose();
    setTimeout(() => {
      setSelectedTester("");
    }, 800);
  };

  const handleInputConfirmFn = () => {
    handleInputConfirm();
    setTimeout(() => {
      setSelectedTester("");
    }, 800);
  };

  return (
    <Modal
      show={showInputModal}
      onHide={handleInputClose}
      className="my-input-modal"
      dialogClassName="my-input-dialog"
    >
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col xs={12}>{message}</Col>
          </Row>
          {isInputVisible && (
            <Row>
              <Col xs={12}>
                <Dropdown className="mt-3 dropdown-tester">
                  <Dropdown.Toggle
                    className="dropdown-toggler"
                    variant="success"
                    id="dropdown-basic"
                  >
                    {selectedTester || INITIAL_TESTER_SELECTION}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {Array.isArray(testerNameData) &&
                    testerNameData.length > 0 ? (
                      testerNameData.map((item) => (
                        <Dropdown.Item
                          key={item.IdForRow}
                          onClick={() => handleTesterSelection(item.TesterName)}
                        >
                          {item.TesterName}
                        </Dropdown.Item>
                      ))
                    ) : (
                      <Dropdown.Item disabled>Veri yok</Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          )}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleInputCloseFn}>
          Hayır
        </Button>
        <Button variant="primary" onClick={handleInputConfirmFn}>
          Evet
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

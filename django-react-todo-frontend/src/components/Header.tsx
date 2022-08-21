import { useState } from "react";

import { Row, Col, Button } from "react-bootstrap";

import { FORM_TYPES } from "../constants/formTypes";
import FormModal from "./FormModal";

const Header: React.FC = () => {
  const [show, setShow] = useState(false);

  return (
    <header className="header">
      <Row className="p-3">
        <Col xs={8}>
          <h2>Todo List</h2>
        </Col>
        <Col xs={4} className="text-end">
          <Button variant="outline-secondary" onClick={() => setShow(true)}>
            {FORM_TYPES.ADD}
          </Button>
        </Col>
      </Row>
      {show && (
        <FormModal
          formType={FORM_TYPES.ADD}
          show={show}
          handleClose={() => setShow(false)}
        />
      )}
    </header>
  );
};

export default Header;

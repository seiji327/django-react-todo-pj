import { useState } from "react";

import { ListGroup, Row, Col, Button } from "react-bootstrap";

import { Todo as TodoType } from "../types/todoTypes";
import { FORM_TYPES } from "../constants/formTypes";
import CustomCheckbox from "./CustomCheckbox";
import FormModal from "./FormModal";
import DeleteModal from "./DeleteModal";

type TodoProps = {
  todo: TodoType;
};

const Todo: React.FC<TodoProps> = ({ todo }) => {
  const [formType, setFormType] = useState(FORM_TYPES.INITIAL_VAL);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Format 'created_at' field to "YYYY-MM-DD"
  const createdDate = todo.created_at
    ? new Date(todo.created_at).toISOString().split("T")[0]
    : "";

  const handleButtonClick = (selectedFormType: FORM_TYPES) => {
    setFormType(selectedFormType);
    setShowFormModal(true);
  };

  return (
    <ListGroup.Item>
      <Row className="align-items-center">
        <Col xxl={7} lg={5} xs={12} className="p-3">
          <CustomCheckbox
            label={todo.title}
            checked={todo.completed}
            todo={todo}
          />
        </Col>
        <Col xxl={2} lg={3} xs={12} className="text-muted text-end p-3 p-lg-0">
          {createdDate}
        </Col>
        <Col
          xxl={3}
          lg={4}
          xs={12}
          className="d-flex justify-content-around justify-content-sm-end"
        >
          <Button
            className="me-3"
            variant="outline-info"
            onClick={() => handleButtonClick(FORM_TYPES.DETAIL)}
          >
            {FORM_TYPES.DETAIL}
          </Button>
          <Button
            className="me-3"
            variant="outline-warning"
            onClick={() => handleButtonClick(FORM_TYPES.UPDATE)}
          >
            {FORM_TYPES.UPDATE}
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => setShowDeleteModal(true)}
          >
            DELETE
          </Button>
        </Col>
      </Row>
      {showFormModal && (
        <FormModal
          show={showFormModal}
          formType={formType}
          handleClose={() => setShowFormModal(false)}
          todo={todo}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          todo={todo}
          show={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
        />
      )}
    </ListGroup.Item>
  );
};

export default Todo;

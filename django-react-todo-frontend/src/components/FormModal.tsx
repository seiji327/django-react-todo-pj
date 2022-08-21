import { useEffect, useState } from "react";

import { Modal, Form, Button } from "react-bootstrap";

import { Todo } from "../types/todoTypes";
import { FORM_TYPES } from "../constants/formTypes";
import useTodoContext from "../hooks/useTodoContext";

type ModalFormProps = {
  todo?: Todo;
  show: boolean;
  formType: FORM_TYPES;
  handleClose: () => void;
};

const ModalForm: React.FC<ModalFormProps> = ({
  todo,
  show,
  formType,
  handleClose,
}) => {
  const { addTodo, updateTodo } = useTodoContext();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formDisabled = formType === FORM_TYPES.DETAIL;

  const [formTodo, setFormTodo] = useState({
    title: todo?.title ? todo.title : "",
    description: todo?.description ? todo.description : "",
    completed: todo?.completed ? todo.completed : false,
  });

  const validateInput = () => {
    return formTodo.title.trim().length !== 0;
  };

  const handleSave = () => {
    if (validateInput()) {
      if (formType === FORM_TYPES.ADD) {
        addTodo(formTodo);
      } else if (formType === FORM_TYPES.UPDATE) {
        todo?.id && updateTodo(todo.id, formTodo);
      }
      handleClose();
    } else {
      setErrorMessage("This field is required.");
    }
  };

  useEffect(() => {
    // Delete error message when user starts typing.
    formTodo.title.length > 0 && setErrorMessage(null);
  }, [formTodo.title.length]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Todo Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              maxLength={50}
              value={formTodo.title}
              onChange={(e) =>
                setFormTodo({ ...formTodo, [e.target.name]: e.target.value })
              }
              disabled={formDisabled}
              autoFocus
            />
            <p className="text-danger">{errorMessage}</p>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              maxLength={255}
              value={formTodo.description}
              onChange={(e) =>
                setFormTodo({ ...formTodo, [e.target.name]: e.target.value })
              }
              disabled={formDisabled}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Completed"
              name="completed"
              checked={formTodo.completed}
              onChange={(e) =>
                setFormTodo({ ...formTodo, [e.target.name]: e.target.checked })
              }
              disabled={formDisabled}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      {!formDisabled && (
        <Modal.Footer>
          <Button variant="outline-success" onClick={() => handleSave()}>
            SAVE
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default ModalForm;

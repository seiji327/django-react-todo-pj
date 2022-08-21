import { Modal, Button } from "react-bootstrap";

import { Todo } from "../types/todoTypes";
import useTodoContext from "../hooks/useTodoContext";

type DeleteModalProps = {
  show: boolean;
  todo: Todo;
  handleClose: () => void;
};

const DeleteModal: React.FC<DeleteModalProps> = ({
  show,
  todo,
  handleClose,
}) => {
  const { deleteTodo } = useTodoContext();

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>DELETE</Modal.Header>
      <Modal.Body className="text-center">
        <p className="text-muted">Are you sure you want to delete ?</p>
        <p className="font-weight-bold">{todo.title}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-warning" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="outline-danger"
          onClick={() => todo.id && deleteTodo(todo.id)}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;

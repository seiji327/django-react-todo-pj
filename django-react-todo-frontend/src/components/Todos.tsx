import { ListGroup, Spinner } from "react-bootstrap";

import Todo from "./Todo";
import useTodoContext from "../hooks/useTodoContext";

const Todos: React.FC = () => {
  const { filteredTodoItems, isLoading, errorMessage } = useTodoContext();

  return (
    <ListGroup
      variant="flush"
      className={`todos${filteredTodoItems.length ? " todos--overflow" : ""}`}
    >
      {/* LOADING */}
      {isLoading && (
        <div className="m-auto text-center">
          <p>Loading Todos...</p>
          <Spinner animation="border" variant="success" />
        </div>
      )}

      {/* ERROR */}
      {!isLoading && errorMessage && (
        <p className="m-auto text-danger">{errorMessage}</p>
      )}

      {/* DISPLAY TODOS */}
      {!isLoading && !errorMessage && filteredTodoItems.length
        ? filteredTodoItems.map((todo) => <Todo key={todo.id} todo={todo} />)
        : !isLoading &&
          !errorMessage &&
          !filteredTodoItems.length && <p className="m-auto">Add more Todo!</p>}
    </ListGroup>
  );
};

export default Todos;

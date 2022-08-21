import { useState, useEffect, useCallback, createContext } from "react";

import { Todo, Todos, TodoContextType } from "../types/todoTypes";
import { AxiosInstance } from "../api/Axios";
import { FILTER_ITEMS } from "../constants/filterItems";
import useAxiosFetch from "../hooks/useAxiosFetch";

type TodoProviderProps = {
  children: React.ReactNode;
};

export const TodoContext = createContext<TodoContextType | null>(null);

const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const { data, isLoading, errorMessage } = useAxiosFetch();

  const [todos, setTodos] = useState<Todos>([]);

  const [filteredTodoItems, setFilteredTodoItems] = useState(todos);

  const addTodo = async (newTodo: Todo) => {
    try {
      const res = await AxiosInstance.post("/todos/", newTodo);
      const createdTodo: Todo = res.data;
      setTodos([...todos, createdTodo]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodo = async (id: number, todoToUpdate: Todo) => {
    try {
      const res = await AxiosInstance.put(`/todos/${id}/`, todoToUpdate);
      const updatedTodo: Todo = res.data;
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? updatedTodo : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await AxiosInstance.delete(`/todos/${id}/`);
      const filteredArray = todos.filter((todo) => todo.id !== id);
      setTodos(filteredArray);
    } catch (error) {
      console.error(error);
    }
  };

  const filterTodos = useCallback(
    (selectedFilterItem: FILTER_ITEMS) => {
      switch (selectedFilterItem) {
        case FILTER_ITEMS.ALL:
          setFilteredTodoItems(todos);
          break;
        case FILTER_ITEMS.COMPLETED:
          setFilteredTodoItems(todos.filter((todo) => todo.completed === true));
          break;
        case FILTER_ITEMS.NOT_COMPLETED:
          setFilteredTodoItems(
            todos.filter((todo) => todo.completed === false)
          );
          break;
        default:
          break;
      }
    },
    [todos]
  );

  useEffect(() => {
    setTodos(data);
  }, [data]);

  return (
    <TodoContext.Provider
      value={{
        todos,
        filteredTodoItems,
        isLoading,
        errorMessage,
        addTodo,
        updateTodo,
        deleteTodo,
        filterTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;

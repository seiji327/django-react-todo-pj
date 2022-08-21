import { FILTER_ITEMS } from "../constants/filterItems";

export type Todo = {
  id?: number;
  title: string;
  description: string;
  created_at?: string;
  completed: boolean;
};

export type Todos = Todo[];

export type TodoContextType = {
  todos: Todos;
  filteredTodoItems: Todos;
  isLoading: boolean;
  errorMessage: string | null;
  addTodo: (todo: Todo) => void;
  updateTodo: (id: number, todo: Todo) => void;
  deleteTodo: (id: number) => void;
  filterTodos: (selectedFilterItem: FILTER_ITEMS) => void;
};

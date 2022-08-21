import { useContext } from "react";

import { TodoContext } from "../context/TodoContext";
import { TodoContextType } from "../types/todoTypes";

const useTodoContext = () => {
  return useContext(TodoContext) as TodoContextType;
};

export default useTodoContext;

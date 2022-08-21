import { useEffect, useState } from "react";

import { Todo } from "../types/todoTypes";
import useTodoContext from "../hooks/useTodoContext";

type CustomCheckboxProps = {
  label: string;
  checked: boolean;
  todo: Todo;
};

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  checked,
  todo,
}) => {
  const { updateTodo } = useTodoContext();
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => {
    setIsChecked((prev) => !prev);
    todo.id && updateTodo(todo.id, { ...todo, completed: !todo.completed });
  };

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <label className="d-flex custom-checkbox" style={{ cursor: "pointer" }}>
      <input
        className={`custom-checkbox__checkbox${
          isChecked ? " custom-checkbox__checkbox--checked" : ""
        }`}
        type="checkbox"
        checked={isChecked}
        onChange={() => handleChange()}
      />
      <span
        className={`text-truncate ms-3${
          isChecked ? " text-decoration-line-through" : ""
        }`}
      >
        {label}
      </span>
    </label>
  );
};

export default CustomCheckbox;

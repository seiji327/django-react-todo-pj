import { useState, useEffect } from "react";

import { Row, Col, Button } from "react-bootstrap";
import { FILTER_ITEMS } from "../constants/filterItems";
import useTodoContext from "../hooks/useTodoContext";

const FilterButtons = () => {
  const { filterTodos } = useTodoContext();
  const [activeFilterItem, setActiveFilterItem] = useState(FILTER_ITEMS.ALL);

  const handleClick = (selectedFilterItem: FILTER_ITEMS) => {
    setActiveFilterItem(selectedFilterItem);
    filterTodos(selectedFilterItem);
  };

  useEffect(() => {
    filterTodos(activeFilterItem);
  }, [activeFilterItem, filterTodos]);

  return (
    <Row className="justify-content-center filter-buttons">
      {Object.values(FILTER_ITEMS).map((filterItem, key) => (
        <Col md={4} xs={12} className="text-center mb-2 mb-sm-0" key={key}>
          <Button
            variant="outline-dark"
            className={`filter-buttons__filter-button${
              filterItem === activeFilterItem ? " active" : ""
            }`}
            onClick={() => handleClick(filterItem)}
          >
            {filterItem}
          </Button>
        </Col>
      ))}
    </Row>
  );
};

export default FilterButtons;

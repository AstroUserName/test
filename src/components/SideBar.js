import React from "react";
import { useSelector, useDispatch } from "react-redux";

const SideBar = ({ show }) => {
  const dispatch = useDispatch();
  const removedItems = useSelector((state) => state.productsData.removedItems);

  const restoreItem = (id, category) => {
    dispatch({ type: "RESTORE_ITEM", payload: { id, category } });
  };

  return (
    <div className={`sidebar ${show ? "show" : ""}`}>
      <h2>Удалённые элементы</h2>
      <ul>
        {removedItems?.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => restoreItem(item.id, item.category)}>
              Восстановить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
